# Solution Description: Character and Background Generation Scripts

## Overview
To automate asset creation for Visual Novels, we will implement two scripts:
- `generate-characters.mjs` for character images
- `generate-backgrounds.mjs` for background images

## Technical Approach
- Each script will accept a prompt and output path (defaulting to `characters/` or `backgrounds/`).
- The scripts will use the gen4 pipeline to generate images.
- Output folders will be created if they do not exist.
- Usage will be documented in the plan.

## Alignment
- This solution supports modular, organized asset generation.
