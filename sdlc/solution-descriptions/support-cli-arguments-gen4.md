# Solution Description: Support CLI Arguments for Prompt, Mode, and Output

## Overview
Enhance the gen4 image generator script to accept command-line arguments for prompt, mode (fast, normal, dev), and output path, improving usability and flexibility.

## Steps
1. Use a CLI argument parser (e.g., yargs or process.argv) to handle input arguments.
2. Allow the user to specify:
    - Prompt (text or file)
    - Mode (fast, normal, dev)
    - Output path for the generated image
3. Update the script to use these arguments in the image generation process.
4. Add usage instructions and examples to the script or documentation.
5. Test the script with various argument combinations to ensure correct behavior.

## Rationale
Supporting CLI arguments makes the script more user-friendly and adaptable to different workflows.

## Alignment
- **Architecture**: Promotes modularity and reusability.
- **Vision**: Supports rapid prototyping and experimentation.

## Acceptance Criteria Mapping
- Script accepts and uses CLI arguments
- Usage is documented
- Functionality is verified
