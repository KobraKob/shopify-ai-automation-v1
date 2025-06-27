from crewai import Agent

researcher_agent = Agent(
    role="Shopify Keyword Researcher",
    goal="Find high-performing SEO keywords for a given Shopify product",
    backstory="You are an expert Shopify SEO strategist who knows how to find the most searched, high-converting keywords. You analyze product descriptions and match them to trending searches and tags.",
    verbose=True,
    allow_delegation=False
)
