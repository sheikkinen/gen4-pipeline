# Sample Run: Visual Novel Asset Generation Pipeline

This document demonstrates a full sample run of the Gen4 + Kling pipeline for a fantasy visual novel story (male hero, damsel in distress, villain, fantasy setting).

## 1. Prepare Story Documents

- `novel/storyboard.md` — Storyboard with scene sequence and requirements
- `novel/characters/character-descriptions.md` — Character prompts
- `novel/backgrounds/background-descriptions.md` — Background prompts
- `novel/scenes/scene-descriptions.md` — Scene prompts and asset links

## 2. Generate Character Images

```sh
node src/gen4-image-generator.mjs --prompt "Young male hero, short brown hair, leather armor, sword, determined" --output novel/characters/character-<timestamp>.png
node src/gen4-image-generator.mjs --prompt "Beautiful young woman, long blonde hair, flowing dress, hopeful" --output novel/characters/character-<timestamp>.png
node src/gen4-image-generator.mjs --prompt "Dark sorcerer, tall, black cloak, red eyes, menacing" --output novel/characters/character-<timestamp>.png
node src/gen4-image-generator.mjs --prompt "Elderly villager, gray beard, staff, wise, kind" --output novel/characters/character-<timestamp>.png
```

## 3. Generate Background Images

```sh
node src/gen4-image-generator.mjs --prompt "Medieval fantasy village, morning, peaceful" --output novel/backgrounds/background-<timestamp>.png
node src/gen4-image-generator.mjs --prompt "Forest clearing, sunlight filtering through trees" --output novel/backgrounds/background-<timestamp>.png
node src/gen4-image-generator.mjs --prompt "Dark stone lair, torches, magical symbols, ominous" --output novel/backgrounds/background-<timestamp>.png
```

## 4. Generate a Scene Image (scene1)

```sh
node src/gen4-image-generator.mjs --prompt "The hero receives a quest from the village elder." \
  --local_image novel/characters/character-<timestamp>.png \
  --local_image novel/characters/character-<timestamp>.png \
  --local_image novel/backgrounds/background-<timestamp>.png \
  --output novel/scenes/scene-<timestamp>.png
```

## 5. Generate a Video from the Scene

```sh
node src/generate-videos.mjs --prompt "The hero receives a quest from the village elder." \
  --start_image novel/scenes/scene-<timestamp>.png \
  --output novel/videos --duration 5
```

## 6. Generate Audio for a Scene

```sh
node src/generate-audio.mjs --prompt "gentle wind, birds chirping, distant river" --duration 5 --output novel/audio/audio-<timestamp>.mp3
```

## 7. Combine Video and Audio (Optional)

To combine a generated video and audio file into a single MP4 using ffmpeg:

```sh
ffmpeg -i novel/videos/video-<timestamp>.mp4 -i novel/audio/audio-<timestamp>.mp3 -c:v copy -c:a aac -shortest novel/videos/video-with-audio-<timestamp>.mp4
```

- This will mux the audio and video, trimming to the shorter of the two if needed.

## 8. Outputs

- Character images: `novel/characters/character-*.png`
- Background images: `novel/backgrounds/background-*.png`
- Scene image: `novel/scenes/scene-*.png`
- Video: `novel/videos/video-*.mp4`
- Audio: `novel/audio/audio-*.mp3`
- Each output has a sidecar `.txt` file with the prompt used.

## 9. References

- Storyboard, character, background, and scene markdown files in `novel/`
- See also: `doc/visual-novel-pipeline.md` for pipeline overview

---

This sample run demonstrates the end-to-end workflow for generating assets for a fantasy visual novel using the provided scripts and markdown descriptions. All image generation is now done via `gen4-image-generator.mjs`.
