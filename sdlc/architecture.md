# Architecture

## Project Folder Structure

```
/ (root)
├── samples/                # Example data, scripts, or reference files
├── src/                    # Source code implementation
│   └── gen4-image-generator.mjs # Stand-alone script for image generation
├── test/                   # Automated and manual test scripts
├── doc/                    # General project documentation (guides, API docs, etc.)
└── sdlc/                   # SDLC-related files and folders
    ├── architecture.md     # System architecture description
    ├── vision.md           # Project vision and goals
    ├── backlog.md          # Simple tasklist backlog
    ├── user-stories/       # User stories
    └── solution-descriptions/ # Solution descriptions
```

## Implementation Details

- The main image generation logic is implemented in `src/gen4-image-generator.mjs`, which supports CLI arguments for prompt, mode, output, and resolution.
- Environment variables (such as the Replicate API token) are loaded using `dotenv` from a `.env` file if present.
- The script uses the Replicate API to generate images with the selected model and resolution, and can download the resulting image to a specified path.
- The script supports using a local image as a reference via the `--local_image` CLI argument. The image is base64-encoded and passed to the Replicate API as a data URL, enabling users to use their own assets in addition to remote URLs.
- The `samples/` folder contains reference scripts and data, while `test/` is reserved for automated/manual test scripts.
- The `doc/` folder contains general project documentation, such as guides and API docs.
- The `sdlc/` folder contains all SDLC documentation, including architecture, vision, backlog, user stories, and solution descriptions.
- The project will include scripts for generating and organizing Visual Novel assets:
  - `generate-characters.mjs` for character images (output to `characters/`)
  - `generate-backgrounds.mjs` for background images (output to `backgrounds/`)
  - `generate-scenes.mjs` for scene images (output to `scenes/`)
- The plan and workflow are documented in `doc/visual-novel-plan.md`.

_This document will describe the system architecture._
