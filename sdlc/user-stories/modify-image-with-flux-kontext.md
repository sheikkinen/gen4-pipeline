# User Story: Modify Image with Flux Kontext Model

## Title
As a user, I want to modify an image using the Flux Kontext model via a CLI script, so that I can apply generative transformations to images with custom prompts and parameters.

## Acceptance Criteria
- The script accepts a prompt, input image URL, output path, and model parameters as CLI arguments.
- The script calls the Flux Kontext model on Replicate with the provided arguments.
- The script downloads and saves the resulting image to the specified output path.
- The script throws an error if a local file is provided as input_image (URL support only).
- The script provides clear error messages for invalid input or API errors.

## Notes
- CLI usage should be similar to gen4-image-generator.mjs for consistency.
- Model parameters should be configurable via CLI.
