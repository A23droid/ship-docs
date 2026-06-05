# Ship Docs — Frontend

Generate production-ready README files from any GitHub repository.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- react-markdown + remark-gfm
- Lucide React icons

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── RepoInputForm.tsx
│   ├── FeatureSection.tsx
│   ├── MarkdownEditorPanel.tsx
│   ├── MarkdownPreviewPanel.tsx
│   ├── LoadingOverlay.tsx
│   └── Footer.tsx
├── pages/
│   ├── LandingPage.tsx
│   └── ResultPage.tsx
├── hooks/
│   ├── useGenerate.ts
│   └── useCopy.ts
├── utils/
│   ├── api.ts
│   └── helpers.ts
├── types/
│   └── index.ts
├── styles/
│   └── globals.css
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

Set `VITE_API_BASE` in `.env` to your FastAPI backend URL (e.g. `http://localhost:8000`).

## Backend API

Expected endpoint: `POST /generate`

Request body:
```json
{
  "repoUrl": "https://github.com/owner/repo",
  "description": "Optional description"
}
```

Response:
```json
{
  "markdown": "# Project Title\n..."
}
```
