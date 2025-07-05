# Architecture

## Project Folder Structure

```
/ (root)
├── samples/                # Example data, scripts, or reference files
├── src/                    # Source code implementation
│   └── gen4-image-generator.mjs # Stand-alone script for image generation
├── test/                   # Automated and manual test scripts
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
- The `samples/` folder contains reference scripts and data, while `test/` is reserved for automated/manual test scripts.
- The `sdlc/` folder contains all SDLC documentation, including architecture, vision, backlog, user stories, and solution descriptions.

_This document will describe the system architecture._
