# Solution Description: modify-image.mjs

## Overview
Implement a CLI script `modify-image.mjs` that enables users to modify images using the Flux Kontext model on Replicate. The script should accept a prompt, input image URL, output path, and other model parameters as CLI arguments, invoke the model, and save the resulting image.

## Technical Approach
- Use `yargs` for CLI argument parsing, following the pattern in `gen4-image-generator.mjs`.
- Use `dotenv` to load Replicate API credentials.
- Use `axios` to download the resulting image from the Replicate output URL.
- Use `fs` and `path` to save the image to the specified output path.
- Validate that `input_image` is a URL (not a local file path).
- Provide clear error messages for invalid input or API errors.
- Follow the structure and parameterization of `gen4-image-generator.mjs` for consistency.

## Files Modified/Created
- `src/modify-image.mjs` (new)

## Dependencies
- `yargs`, `dotenv`, `axios`, `fs`, `path`, Replicate API

## Testing
- Manual and automated tests should verify correct CLI parsing, API invocation, error handling, and file output.

## Alignment
- Consistent with project CLI and API usage patterns.
- No changes required to core architecture or vision.
