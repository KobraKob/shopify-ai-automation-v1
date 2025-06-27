from dotenv import load_dotenv
import os
import json
import re
from crewai import Crew, Task
from agents.researcher_agent import researcher_agent
from agents.writer_agent import writer_agent
from utils.prompt_templates import shopify_listing_prompt
from shopify_uploader import upload_product

load_dotenv()

def run_listing_pipeline(product_description, additional_details, upload=False):
    # Step 1: Task to find SEO keywords
    keyword_task = Task(
        description=f"Find trending SEO keywords for Shopify product: {product_description}",
        expected_output="Comma-separated keywords (max 13)",
        agent=researcher_agent
    )

    # Step 2: Task to write Shopify listing
    listing_task = Task(
        description=shopify_listing_prompt(product_description, additional_details, "{output_of_task_1}"),
        expected_output="JSON with title, description, and tags",
        agent=writer_agent,
        context=[keyword_task]
    )

    # Step 3: Run the crew
    crew = Crew(tasks=[keyword_task, listing_task])
    results = crew.kickoff()

    # Step 4: Try parsing JSON from string output
    try:
        if isinstance(results, str):
            cleaned = re.sub(r"```json|```", "", results).strip()
            listing = json.loads(cleaned)
        elif isinstance(results, dict):
            listing = results
        else:
            raise ValueError("Unexpected result format")
    except Exception as e:
        print("❌ Failed to parse AI response:", e)
        return {"error": "Invalid AI output", "raw": str(results)}

    # Step 5: Upload only if explicitly required
    if upload:
        upload_product(
            listing['title'],
            listing['description'],
            listing['tags']
        )

    return listing
