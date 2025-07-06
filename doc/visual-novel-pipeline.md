# Visual Novel Generation Pipeline (Gen4 + Kling)

## 1. Storyboard Creation
- **Input:** High-level plot outline, scene list, and sequence.
- **Output:** `novel/storyboard.md`
  - Each entry: scene ID, description, character roles, background, and video requirements.

## 2. Character Descriptions
- **Input:** Character bios, visual traits, roles.
- **Output:** `novel/characters/character-descriptions.md`
  - Each entry: character ID, name, prompt, and reference images (optional).

## 3. Background Descriptions
- **Input:** Scene settings, locations, mood.
- **Output:** `novel/backgrounds/background-descriptions.md`
  - Each entry: background ID, prompt, and references.

## 4. Scene Descriptions
- **Input:** Storyboard, character and background references.
- **Output:** `novel/scenes/scene-descriptions.md`
  - Each entry: scene ID, prompt, character IDs, background ID, and references.

## 5. Asset Generation Scripts
- **Characters:**
  - Script: `src/generate-characters.mjs`
  - Input: character description markdown
  - Output: PNGs in `novel/characters/`, prompt metadata `.txt`
- **Backgrounds:**
  - Script: `src/generate-backgrounds.mjs`
  - Input: background description markdown
  - Output: PNGs in `novel/backgrounds/`, prompt metadata `.txt`
- **Scenes:**
  - Script: `src/generate-scenes.mjs`
  - Input: scene description markdown, references to character/background images
  - Output: PNGs in `novel/scenes/`, prompt metadata `.txt`
- **Videos:**
  - Script: `src/generate-videos.mjs`
  - Input: scene image, video prompt, duration, mode
  - Output: MP4s in `novel/videos/`, prompt metadata `.txt`
- **Audio:**
  - Script: `src/generate-audio.mjs`
  - Input: audio prompt (e.g., scene description, sound effects), duration
  - Output: MP3s in `novel/audio/`, prompt metadata `.txt`

## 6. Linking and Traceability
- Each generated asset includes a sidecar `.txt` with the prompt and references used.
- Markdown description files link IDs to generated files for easy lookup and automation.
- Optionally, generate a manifest (`novel/manifest.md`) mapping all assets and their relationships.

## 7. Automation & Testing
- Use a master script or Makefile to run the full pipeline in order.
- Automated Jest tests verify output existence, folder structure, and prompt metadata for images, videos, and audio.
- Note: First audio generation may take up to 60 seconds to boot the model.

---

**Example Pipeline Flow:**
1. Author writes storyboard and descriptions in markdown files.
2. Run character/background generation scripts.
3. Run scene generation script, referencing generated assets.
4. Run video generation script, referencing scene images.
5. Run audio generation script, referencing scene descriptions or sound prompts.
6. Review outputs in `novel/` folders; use manifest for navigation.

---

_This document describes the working pipeline for Visual Novel asset generation using Gen4, Kling, and Audiogen models._
