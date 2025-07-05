# Solution Description: Video Generation Script for gen4

## Overview
Implement a script in `src/` (e.g., `generate-videos.mjs`) to generate videos using the gen4 pipeline. The script will be modeled after the approach in `samples/kling-sample.txt` and the current image generation scripts, ensuring a consistent CLI and output structure.

## Steps
1. **Review `samples/kling-sample.txt`** to understand the required API calls and workflow for video generation.
2. **Create `novel/videos/`** folder for output videos.
3. **Implement `src/generate-videos.mjs`:**
   - Accept CLI arguments for prompt, output folder, and any video-specific options (e.g., duration, resolution).
   - Use the Replicate API (or similar) to generate video content.
   - Save output videos to `novel/videos/` with unique filenames.
   - Write prompt metadata to the video file if possible (or as a sidecar file).
4. **Testing:**
   - Add a Jest test to verify video creation, output folder, and metadata.
5. **Documentation:**
   - Add usage instructions and example commands to the documentation.

## Notes
- Ensure the script is modular and follows the same conventions as the image generation scripts.
- If video metadata cannot be embedded, save prompt info as a `.json` or `.txt` sidecar file.
- Update architecture and documentation as needed.
