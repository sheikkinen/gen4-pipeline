# User Story: Local Image Reference Support

## Title
As a user, I want to use a local image file as a reference for gen4 image generation, so that I can generate images based on my own assets, not just remote URLs.

## Acceptance Criteria
- The CLI accepts a `--local_image` (or `-l`) argument pointing to a local image file.
- The script base64-encodes the local image and passes it as a reference image to the Replicate API.
- The feature works alongside remote reference images and tags.
- The process is covered by an automated Jest test.
- Usage is documented in the script comments.
