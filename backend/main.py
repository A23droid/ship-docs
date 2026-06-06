# backend/main.py
import os
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel, HttpUrl, Field
import httpx

from LLM_operations.llm import generate_markdown_readme

app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",   # Vite dev server
#         "http://localhost:4173",   # Vite preview
#     ],
#     allow_methods=["GET", "POST", "OPTIONS"],
#     allow_headers=["Content-Type"],
# )



frontend_urls = os.getenv(
    "FRONTEND_URLS",
    "http://localhost:5173"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_urls,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ShipDocsRequest(BaseModel):
    github_url: HttpUrl
    description: Optional[str] = Field(
        None, description="Optional extra business/project context from the user"
    )


class ShipDocsResponse(BaseModel):
    markdown_text: str


@app.get("/")
def home_page():
    return {"status": "ShipDocs Engine Online"}


@app.post("/shipdocs", response_model=ShipDocsResponse)
async def process_url(request: ShipDocsRequest):
    if not request.github_url:
        raise HTTPException(status_code=400, detail="Missing GitHub URL.")

    url_str = str(request.github_url).rstrip("/")
    url_parts = url_str.split("/")

    try:
        owner = url_parts[-2]
        repo_name = url_parts[-1]
    except IndexError:
        raise HTTPException(
            status_code=400, detail="Invalid GitHub repository URL structure."
        )

    headers = {"Accept": "application/vnd.github.v3+json"}
    if token := os.getenv("GITHUB_TOKEN"):
        headers["Authorization"] = f"token {token}"

    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            meta_url = f"https://api.github.com/repos/{owner}/{repo_name}"
            meta_response = await client.get(meta_url, headers=headers)

            if meta_response.status_code == 404:
                raise HTTPException(
                    status_code=404,
                    detail="Target repository not found on GitHub.",
                )
            meta_response.raise_for_status()

            default_branch = meta_response.json().get("default_branch", "main")

            tree_url = (
                f"https://api.github.com/repos/{owner}/{repo_name}"
                f"/git/trees/{default_branch}?recursive=1"
            )
            tree_response = await client.get(tree_url, headers=headers)
            tree_response.raise_for_status()

            raw_tree_data = tree_response.json().get("tree", [])

            tree_lines = []
            for item in raw_tree_data[:150]:
                path = item.get("path", "")
                if "node_modules" in path or ".git" in path:
                    continue
                tree_lines.append(path)

            extracted_tree = "\n".join(tree_lines)

        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Upstream GitHub API communication error: {e.response.text}",
            )

    readme_content = await generate_markdown_readme(
        repo_name=repo_name,
        extracted_tree=extracted_tree,
        user_description=request.description,
    )

    return ShipDocsResponse(markdown_text=readme_content)