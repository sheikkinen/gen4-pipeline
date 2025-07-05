# Solution Description: Local Image Reference Support

## Overview
To allow users to provide a local image as a reference for gen4 image generation, the CLI is extended with a `--local_image` option. The script reads the specified file, base64-encodes it, and adds it to the `reference_images` array as a data URL. This enables seamless integration with the Replicate API, which accepts base64-encoded images.

## Technical Approach
- Add a new CLI argument `--local_image` (alias `-l`) using yargs.
- If provided, read the file synchronously, encode as base64, and prepend `data:image/png;base64,`.
- Push the resulting string to the `reference_images` array in the input object.
- Log a message confirming the local image was added.
- Update script comments to show usage.
- Add a Jest test that:
  - Runs the script with a local image.
  - Verifies the output image is created and contains the correct metadata.

## Alternatives Considered
- Accepting only remote URLs (less flexible for user assets).
- Accepting only one reference image (less flexible for multi-image workflows).

## Risks
- Large local images may increase memory usage.
- Only PNG is assumed for the data URL; could be extended for other formats.

## Alignment
- This solution is compatible with the current architecture and vision, supporting extensibility and user empowerment.
