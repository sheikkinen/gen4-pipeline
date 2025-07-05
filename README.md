# gen4-pipeline

This repository contains the source code, SDLC documentation, and a full Visual Novel asset generation pipeline using Gen4 and Kling models.

## Structure

- .github/ — GitHub-related files
  - `copilot-instructions.md` — Instructions for GitHub Copilot
- `src/` — Source code for all asset generation scripts (characters, backgrounds, scenes, videos)
- `novel/` — Visual Novel asset outputs and markdown descriptions (storyboard, character/background/scene descriptions)
- `test/` — Automated and manual test scripts
- `doc/` — Project documentation, pipeline guides, and sample runs
- `sdlc/` — SDLC documentation (architecture, vision, backlog, user stories, solution descriptions)
- .env — AI keys (ignored)

## Quick Start

1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up your `.env` file with your Replicate API key.
3. See `doc/sample-run.md` for a full example pipeline run.

## Documentation
- Pipeline: `doc/visual-novel-pipeline.md`
- Sample run: `doc/sample-run.md`
- Image generation: `doc/visual-novel-image-generation.md`
- SDLC: `sdlc/architecture.md`, `sdlc/vision.md`, `sdlc/backlog.md`

## Testing
- Run all tests:
  ```sh
  npm test
  ```
- Manual/long-running tests: see `test/generate-videos.manual-test.mjs`

---
For details, see the documentation in the `doc/` and `sdlc/` folders.

