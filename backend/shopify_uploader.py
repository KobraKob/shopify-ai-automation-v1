import os
import requests
from dotenv import load_dotenv

load_dotenv()

SHOP_URL = os.getenv("SHOPIFY_STORE_URL")
ACCESS_TOKEN = os.getenv("SHOPIFY_API_PASSWORD")

def upload_product(title, description, tags):
    url = f"{SHOP_URL}/admin/api/2023-07/products.json"
    
    headers = {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ACCESS_TOKEN
    }
    
    product_data = {
        "product": {
            "title": title,
            "body_html": description,
            "tags": tags,
            "vendor": "AI Agent",
            "status": "draft"  # change to "active" to make it live
        }
    }
    
    response = requests.post(url, json=product_data, headers=headers)
    
    if response.status_code == 201:
        print("✅ Product uploaded successfully!")
        print("Product ID:", response.json()['product']['id'])
    else:
        print("❌ Failed to upload product:")
        print(response.text)
