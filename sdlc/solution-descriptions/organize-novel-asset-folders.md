# Solution Description: Refactor Visual Novel Asset Folders

## Overview
To improve project organization, all visual novel asset outputs (characters, backgrounds, scenes) will be placed under a single `novel/` folder, with subfolders for each asset type. All scripts and tests will be updated to use these new paths.

## Steps
1. **Move/rename folders:**
   - Create `novel/characters/`, `novel/backgrounds/`, and `novel/scenes/` if they do not exist.
   - Move any existing assets from old locations to the new subfolders.
2. **Update scripts:**
   - Update `generate-characters.mjs`, `generate-backgrounds.mjs`, and `generate-scenes.mjs` to output to the new subfolders by default.
3. **Update tests:**
   - Update all test scripts to expect outputs in the new subfolders.
   - Ensure tests dynamically find the latest output in the correct subfolder.
4. **Clean up:**
   - Remove any references to the old flat folder structure in code, tests, and documentation.
5. **Verify:**
   - Run all tests to ensure outputs are correctly placed and metadata is written as expected.

## Notes
- This change aligns with the modular structure described in `architecture.md` and supports maintainability and clarity for future development.
