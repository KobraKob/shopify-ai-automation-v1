from dotenv import load_dotenv
import os
import json
from crewai import Crew, Task
from agents.researcher_agent import researcher_agent
from agents.writer_agent import writer_agent
from utils.prompt_templates import shopify_listing_prompt
from shopify_uploader import upload_product

load_dotenv()

def run_listing_pipeline(product_description, additional_details, base_keywords, upload=False):
    try:
        keyword_task = Task(
            description=f"Find trending SEO keywords for Shopify product: {product_description}",
            expected_output="Comma-separated keywords (max 13)",
            agent=researcher_agent
        )

        listing_task = Task(
            description=shopify_listing_prompt(product_description, additional_details, base_keywords),
            expected_output="JSON with title, description, and tags",
            agent=writer_agent,
            context=[keyword_task]
        )

        crew = Crew(tasks=[keyword_task, listing_task])
        
        try:
            # MAIN FIX HERE — get the output string from the CrewOutput object
            result_obj = crew.kickoff()
        except Exception as e:
            import traceback
            traceback_str = traceback.format_exc()
            print(f" Crew execution failed: {e}\n{traceback_str}")
            return {"error": "Crew execution failed", "details": str(e), "traceback": traceback_str}
        
        if isinstance(result_obj, dict):
            # Handle potential error dictionary
            if 'error' in result_obj:
                raise Exception(f"Crew failed: {result_obj['error']}")
            # Look for a more structured output
            result_text = result_obj.get('result', str(result_obj))
        elif isinstance(result_obj, str):
            result_text = result_obj
        else:
            # Fallback for other types (like CrewOutput)
            result_text = getattr(result_obj, 'output', str(result_obj))

        # Clean markdown formatting if present
        cleaned = result_text.replace("```json", "").replace("```", "").strip()

        # Try parsing JSON
        try:
            listing = json.loads(cleaned)
        except json.JSONDecodeError as e:
            raise ValueError(f"JSON decode failed: {e}\nRaw output: {cleaned}")

        # Upload to Shopify (optional)
        if upload:
            upload_product(listing['title'], listing['description'], listing['tags'])

        return listing

    except Exception as e:
        print(f" Error in pipeline: {str(e)}")
        return {"error": "Listing generation failed", "details": str(e)}
