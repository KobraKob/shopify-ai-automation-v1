from crewai import Agent

from crewai import Agent
from langchain_openai import ChatOpenAI
import os

llm = ChatOpenAI(
    model="sambanova/Llama-4-Maverick-17B-128E-Instruct",
    base_url="https://api.sambanova.ai/v1",
    api_key=os.getenv("SAMBANOVA_API_KEY")
)

researcher_agent = Agent(
    role="Shopify Keyword Researcher",
    goal="Find high-performing SEO keywords for a given Shopify product",
    backstory="You are an expert Shopify SEO strategist who knows how to find the most searched, high-converting keywords. You analyze product descriptions and match them to trending searches and tags.",
    verbose=True,
    allow_delegation=False,
    llm=llm
)
