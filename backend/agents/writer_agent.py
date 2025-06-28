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
    role="Shopify Product Listing Specialist",
    goal="Create engaging and high-converting product titles, descriptions, and tags for Shopify listings that attract traffic and convert visitors into loyal customers.",
    backstory="""
    You are an expert eCommerce copywriter with a proven track record in crafting compelling product listings.
    Your expertise lies in creating scroll-stopping Shopify product titles that grab attention, persuasive and SEO-rich descriptions that inform and entice,
    and high-impact tags that improve searchability. You have a deep understanding of customer psychology and emotional triggers,
    allowing you to tailor content that resonates with the target audience and aligns with the brand's voice.
    Your ultimate goal is to maximize conversions and enhance the overall shopping experience.
    """,
    verbose=True,
    allow_delegation=False,
    llm=llm
)

