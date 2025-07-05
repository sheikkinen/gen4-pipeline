# Sample Run: Visual Novel Asset Generation Pipeline

This document demonstrates a full sample run of the Gen4 + Kling pipeline for a fantasy visual novel story (male hero, damsel in distress, villain, fantasy setting).

## 1. Prepare Story Documents

- `novel/storyboard.md` — Storyboard with scene sequence and requirements
- `novel/characters/character-descriptions.md` — Character prompts
- `novel/backgrounds/background-descriptions.md` — Background prompts
- `novel/scenes/scene-descriptions.md` — Scene prompts and asset links

## 2. Generate Character Images

```sh
node src/generate-characters.mjs --prompt "Young male hero, short brown hair, leather armor, sword, determined" --output novel/characters
node src/generate-characters.mjs --prompt "Beautiful young woman, long blonde hair, flowing dress, hopeful" --output novel/characters
node src/generate-characters.mjs --prompt "Dark sorcerer, tall, black cloak, red eyes, menacing" --output novel/characters
node src/generate-characters.mjs --prompt "Elderly villager, gray beard, staff, wise, kind" --output novel/characters
```

## 3. Generate Background Images

```sh
node src/generate-backgrounds.mjs --prompt "Medieval fantasy village, morning, peaceful" --output novel/backgrounds
node src/generate-backgrounds.mjs --prompt "Forest clearing, sunlight filtering through trees" --output novel/backgrounds
node src/generate-backgrounds.mjs --prompt "Dark stone lair, torches, magical symbols, ominous" --output novel/backgrounds
```

## 4. Generate a Scene Image (scene1)

```sh
node src/generate-scenes.mjs --prompt "The hero receives a quest from the village elder." \
  --reference_images novel/characters/character-1751706630268.png \
                    novel/characters/character-1751706700958.png \
                    novel/backgrounds/background-1751706840705.png \
  --output novel/scenes
```

## 5. Generate a Video from the Scene

```sh
node src/generate-videos.mjs --prompt "The hero receives a quest from the village elder." \
  --start_image novel/scenes/scene-1751706921871.png \
  --output novel/videos --duration 5
```

## 6. Outputs

- Character images: `novel/characters/character-*.png`
- Background images: `novel/backgrounds/background-*.png`
- Scene image: `novel/scenes/scene-*.png`
- Video: `novel/videos/video-*.mp4`
- Each output has a sidecar `.txt` file with the prompt used.

## 7. References

- Storyboard, character, background, and scene markdown files in `novel/`
- See also: `doc/visual-novel-pipeline.md` for pipeline overview

---

This sample run demonstrates the end-to-end workflow for generating assets for a fantasy visual novel using the provided scripts and markdown descriptions.
