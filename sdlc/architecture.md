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
│   ├── generate-videos.mjs        # Script for video generation (Kling model)
│   └── ...
├── novel/                  # Visual Novel asset outputs
│   ├── characters/         # Generated character images
│   ├── backgrounds/        # Generated background images
│   ├── scenes/             # Generated scene images
│   ├── videos/             # Generated video assets
│   ├── storyboard.md       # Storyboard for sample story
│   └── ...
├── test/                   # Automated and manual test scripts
│   ├── gen4-image-generator.test.mjs
│   ├── gen4-image-generator.local-image.test.mjs
│   ├── generate-characters.test.mjs
│   ├── generate-backgrounds.test.mjs
│   ├── generate-scenes.test.mjs
│   ├── generate-videos.test.mjs
│   ├── generate-videos.manual-test.mjs
│   └── results/            # Test output results
├── doc/                    # General project documentation (guides, API docs, etc.)
│   ├── visual-novel-plan.md
│   ├── visual-novel-image-generation.md
│   ├── visual-novel-pipeline.md
│   └── sample-run.md
└── sdlc/                   # SDLC-related files and folders
    ├── architecture.md     # System architecture description
    ├── vision.md           # Project vision and goals
    ├── backlog.md          # Simple tasklist backlog
    ├── user-stories/       # User stories
    └── solution-descriptions/ # Solution descriptions
```

## Implementation Details

- The pipeline supports markdown-based story, character, background, and scene descriptions for traceable, human-editable workflows.
- Scripts in `src/` generate images and videos using prompts from these markdown files.
- Each generated asset includes a sidecar `.txt` file with the prompt and references used.
- Automated and manual tests exist for all major scripts, including long-running video generation.
- See `doc/sample-run.md` for a full example run, and `doc/visual-novel-pipeline.md` for the overall workflow.

_This document describes the system architecture and is updated as new features and scripts are added._
