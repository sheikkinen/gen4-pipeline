# User Story: Organize Visual Novel Asset Folders

## Title
Refactor asset folders: Place characters, backgrounds, and scenes under a single `novel/` folder

## As a
Developer or project maintainer

## I want
All generated visual novel assets (characters, backgrounds, scenes) to be organized under a top-level `novel/` folder, with subfolders for each asset type.

## So that
- The project structure is clean and modular
- All VN assets are easy to locate and manage
- Scripts and tests are consistent and maintainable

## Acceptance Criteria
- All generated character images are saved to `novel/characters/`
- All generated background images are saved to `novel/backgrounds/`
- All generated scene images are saved to `novel/scenes/`
- All scripts and tests are updated to use the new paths
- No references to the old flat folder structure remain
