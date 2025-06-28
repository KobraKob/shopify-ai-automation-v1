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

# The run_listing_pipeline function has been moved to backend/run_listing_pipeline.py
# and is imported there by api.py.
# If this main.py is used for CLI or other purposes,
# it should import run_listing_pipeline from backend.run_listing_pipeline
