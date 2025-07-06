# Visual Novel Image & Audio Generation with gen4 Pipeline

## Introduction
This guide explains how to use the gen4 pipeline to generate high-quality character, background, and scene images, as well as audio for Visual Novel projects. It covers setup, usage, folder structure, testing, and troubleshooting.

## Setup
1. **Clone the repository** and install dependencies:
   ```sh
   git clone <repo-url>
   cd gen4-pipeline
   npm install
   ```
2. **Set up environment variables:**
   - Create a `.env` file with your Replicate API key:
     ```
     REPLICATE_API_TOKEN=your_token_here
     ```

## Folder Structure
- `novel/characters/` — Generated character images
- `novel/backgrounds/` — Generated background images
- `novel/scenes/` — Generated scene images
- `novel/audio/` — Generated audio files
- `test/results/` — Output for automated tests

## Generating Assets
### Characters
```sh
node src/generate-characters.mjs --prompt "A test character for visual novel." --output ./novel/characters
```

### Backgrounds
```sh
node src/generate-backgrounds.mjs --prompt "A test background for visual novel." --output ./novel/backgrounds
```

### Scenes
```sh
node src/generate-scenes.mjs --prompt "A test scene for visual novel." --reference_images ./novel/characters/char1.png ./novel/backgrounds/bg1.png --output ./novel/scenes
```

### Audio
```sh
node src/generate-audio.mjs --prompt "gentle wind, birds chirping, distant river" --duration 5 --output ./novel/audio/audio-1.mp3
```
- All scripts support `--prompt` and `--output` options. See each script for more CLI options.
- Audio script also supports `--duration` option.
- Note: First audio generation may take up to 60 seconds to boot the model.

## Automated Testing
- Run all tests:
  ```sh
  npm test
  ```
- Tests verify image, video, and audio creation, output folder, and EXIF/metadata.

## Best Practices
- Use descriptive prompts for best results.
- Organize assets in the `novel/` subfolders.
- Review EXIF metadata to track prompt history.

## Troubleshooting
- If images or audio are not generated, check your API key and network.
- If EXIF metadata is missing, ensure scripts complete without interruption.
- For ESM/Jest issues, always use `npm test`.

## References
- [Architecture](../sdlc/architecture.md)
- [Vision](../sdlc/vision.md)
- [Automated Tests](../test/)

---
For further help, see the README or contact the project maintainers.
