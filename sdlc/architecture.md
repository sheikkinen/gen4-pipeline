# Architecture

## Project Folder Structure

```
/ (root)
├── samples/                # Example data, scripts, or reference files
├── src/                    # Source code implementation
│   ├── gen4-image-generator.mjs   # Stand-alone script for image generation
│   ├── generate-characters.mjs    # Script for character image generation
│   ├── generate-backgrounds.mjs   # Script for background image generation
│   ├── generate-scenes.mjs        # Script for scene image generation
│   └── generate-videos.mjs        # Script for video generation (Kling model)
├── novel/                  # Visual Novel asset outputs
│   ├── characters/         # Generated character images
│   ├── backgrounds/        # Generated background images
│   ├── scenes/             # Generated scene images
│   └── videos/             # Generated video assets
├── test/                   # Automated and manual test scripts
│   ├── gen4-image-generator.test.mjs
│   ├── gen4-image-generator.local-image.test.mjs
│   ├── generate-characters.test.mjs
│   ├── generate-backgrounds.test.mjs
│   ├── generate-scenes.test.mjs
│   ├── generate-videos.test.mjs
│   └── results/            # Test output results
├── doc/                    # General project documentation (guides, API docs, etc.)
│   ├── visual-novel-plan.md
│   └── visual-novel-image-generation.md
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
- The project includes scripts for generating and organizing Visual Novel assets:
  - `generate-characters.mjs` for character images (output to `novel/characters/`)
  - `generate-backgrounds.mjs` for background images (output to `novel/backgrounds/`)
  - `generate-scenes.mjs` for scene images (output to `novel/scenes/`)
  - `generate-videos.mjs` for video assets (output to `novel/videos/`), using the Kling model and supporting start images (base64-encoded PNGs from scenes folder)
- All scripts support CLI arguments for flexible operation and output management.
- Output files include prompt metadata as sidecar `.txt` files for traceability.
- Automated Jest tests exist for all major scripts, validating output creation and metadata.
- The plan and workflow are documented in `doc/visual-novel-plan.md` and `doc/visual-novel-image-generation.md`.

_This document describes the system architecture and is updated as new features and scripts are added._
