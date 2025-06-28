from dotenv import load_dotenv
import os
import json
from run_listing_pipeline import run_listing_pipeline

load_dotenv()

def main():
    """
    This is the main function to run the Shopify listing pipeline.
    It's intended for command-line usage.
    """
    print("Starting Shopify Listing Generation Pipeline...")

    # Example data (replace with actual data source)
    product_description = "A handcrafted leather-bound journal with 200 lined pages."
    additional_details = "The journal has a vintage-style brass clasp and a built-in ribbon bookmark. It's perfect for writers, artists, and dreamers."
    base_keywords = "journal, notebook, diary, leather"

    # Run the pipeline
    result = run_listing_pipeline(product_description, additional_details, base_keywords, upload=False)

    # Print the result
    if "error" in result:
        print(f"Error generating listing: {result['details']}")
    else:
        print("\nShopify Listing Generated Successfully:")
        print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()