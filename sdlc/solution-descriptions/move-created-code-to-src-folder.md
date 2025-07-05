# Solution Description: Move Created Code to src Folder

## Overview
To maintain a clean separation between production code and sample/reference scripts, the stand-alone gen4 image generator script will be moved from the `samples/` directory to the `src/` directory.

## Steps
1. Move `samples/gen4-image-generator.mjs` to `src/gen4-image-generator.mjs`.
2. Update documentation (README, SDLC instructions) to reference the new script location.
3. Ensure the script remains functional after the move.
4. Leave any reference or demonstration files in `samples/`.

## Rationale
Keeping production or main scripts in `src/` and reference/demo files in `samples/` supports clarity, maintainability, and best practices.

## Alignment
- **Architecture**: Supports modularity and clear code organization.
- **Vision**: Promotes maintainability and ease of use for contributors.

## Acceptance Criteria Mapping
- Script is moved to `src/`
- Documentation is updated
- Script works as expected in its new location
