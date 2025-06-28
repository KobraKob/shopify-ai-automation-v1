from crewai import Agent

from crewai import Agent
from langchain_openai import ChatOpenAI
import os

llm = ChatOpenAI(
    model="sambanova/Llama-4-Maverick-17B-128E-Instruct",
    base_url="https://api.sambanova.ai/v1",
    api_key=os.getenv("SAMBANOVA_API_KEY")
)

writer_agent = Agent(
    role="Shopify Listing Copywriter",
    goal="Craft compelling, high-converting product titles, descriptions, and tags for Shopify listings that drive traffic and turn visitors into buyers.",
    backstory="You're an expert eCommerce copywriter—craft scroll-stopping Shopify product titles, persuasive SEO-rich descriptions, and high-impact tags that align with customer psychology, emotional triggers, and the brand’s voice to maximize conversions.",
    verbose=True,
    allow_delegation=False,
    llm=llm
)
