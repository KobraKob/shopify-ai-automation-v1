def shopify_listing_prompt(product, inputs, keywords):
    return f"""
    Product: {product}
    Details: {inputs}
    Keywords: {keywords}

    Write a Shopify-ready product listing with:
    - Title: max 70 characters
    - Description: SEO optimized (300–500 words)
    - Tags: up to 250 characters total

    Output in JSON: {{ "title": "...", "description": "...", "tags": "tag1, tag2, tag3" }}
    """
