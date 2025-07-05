# User Story: Test Cases for Visual Novel Generation Scripts

## Title
As a developer, I want automated test cases for the character, background, and scene generation scripts, so that I can ensure they work as intended and produce the expected outputs.

## Acceptance Criteria
- Jest tests exist for `generate-characters.mjs`, `generate-backgrounds.mjs`, and `generate-scenes.mjs`.
- Each test verifies that the script creates the output folder (if needed), generates an image, and writes the correct metadata.
- Tests are automated and can be run with `npm test`.
