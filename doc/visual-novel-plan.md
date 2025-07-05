# Visual Novel Image Generation Plan

This document outlines the plan for generating and organizing images for a Visual Novel using the gen4 pipeline.

## Folder Structure

- `characters/` — Generated character images
- `backgrounds/` — Generated background images
- `scenes/` — Generated scene images (composites)

## Workflow

1. **Character Generation**
    - Use `generate-characters.mjs` to create character images from prompts.
    - Save outputs to `characters/`.
2. **Background Generation**
    - Use `generate-backgrounds.mjs` to create background images from prompts.
    - Save outputs to `backgrounds/`.
3. **Scene Generation**
    - Use `generate-scenes.mjs` to create scenes using references to character and background images.
    - Save outputs to `scenes/`.

## Example Usage

```sh
node src/generate-characters.mjs --prompt "A young woman in a school uniform, smiling"
node src/generate-backgrounds.mjs --prompt "A cherry blossom park in spring"
node src/generate-scenes.mjs --prompt "The heroine standing in the park, looking at the camera" --reference_images ./characters/character-123.png ./backgrounds/background-456.png
```

## Implementation Notes
- Scripts will create output folders if they do not exist.
- Prompts and references can be customized for each asset.
- All scripts will use the gen4 pipeline and support local/remote references.

---

_This plan will be updated as implementation progresses._
