import os
import json
from groq import AsyncGroq
from dotenv import load_dotenv
load_dotenv()

groq_client = AsyncGroq(api_key=os.getenv("GROQ_API_KEY"))

async def generate_markdown_readme(repo_name: str, extracted_tree: str, user_description: str = None) -> str:
    """
    Asynchronously calls the Groq API using native JSON mode to guarantee 
    a structured response containing only the compiled markdown documentation.
    """

    system_instruction = (
        "You are an expert technical writer. You will be given a GitHub repository structure "
        "and an optional project description. Your single task is to return a beautiful, comprehensive, "
        "and structured markdown README text string.\n\n"
        "CRITICAL: You must output your response inside a valid JSON object matching this schema:\n"
        "{\n"
        "  \"readme\": \"Your full, beautifully formatted markdown README string goes here\"\n"
        "}"
    )
    
    # Construct input context payload
    user_context = f"Repository Name: {repo_name}\n\nDirectory Tree:\n{extracted_tree}"
    if user_description:
        user_context += f"\n\nAdditional Project Context/Description:\n{user_description}"

    try:
        # Pure async chat completion call using native groq syntax
        chat_completion = await groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile", 
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": user_context}
            ],
            # Enforce native JSON mode on Groq hardware
            response_format={"type": "json_object"},
            temperature=0.2 # Lower temperature for structural accuracy
        )
        
        # Extract raw string text content from choices array
        raw_json_output = chat_completion.choices[0].message.content
        
        # Parse the JSON string locally to pull out just the markdown text
        parsed_data = json.loads(raw_json_output)
        
        # Return the clean markdown string back to your FastAPI endpoint handler
        return parsed_data.get("readme", "# Generation Error\nFailed to extract README content.")

    except Exception as e:
        print(f"[Groq Engine Async Error]: {str(e)}")
        raise e
    
