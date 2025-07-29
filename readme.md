# API Agent
A multi-agent AI system that generates README, OpenAPI spec, unit tests, Dockerfile, and audit report from a GitHub repo URL.

## Setup
1. Clone the repo: `[git clone https://github.com/yourusername/api-agent.git](https://github.com/AliBnh/autoDev)`
2. Backend: `cd backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt`
3. Frontend: `cd frontend && npm install`
4. Run: `uvicorn main:app --reload` (backend) and `npm run dev` (frontend).

## Status
- [x] Initial setup
- [ ] Code Analysis Agent
- [ ] Documentation Generation Agent
- [ ] Test Case Generation Agent
- [ ] Dockerfile Generation Agent
- [ ] Audit Analysis Agent
