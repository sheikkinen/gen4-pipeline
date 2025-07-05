# User Story: Move Created Code to src Folder

## As a
Developer or maintainer

## I want to
Move relevant code from the samples directory to the src directory

## So that
The main codebase is organized under src, while samples remain for reference and demonstration only.

### Acceptance Criteria
- The stand-alone gen4 image generator script is moved to `src/` (e.g., `src/gen4-image-generator.mjs`)
- The `samples/` directory retains only reference or demonstration files
- Documentation and instructions are updated to reflect the new location
- The script remains functional after being moved
