from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import shutil

app = FastAPI()

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RepoInput(BaseModel):
    repo_url: str

@app.post("/generate")
async def generate(repo: RepoInput):
    # Clear output folder for new request
    shutil.rmtree("output", ignore_errors=True)
    os.makedirs("output")
    # Placeholder: Will be updated in Step 2
    return {"message": f"Processing repo: {repo.repo_url}"}

@app.get("/health")
async def health():
    return {"status": "healthy"}