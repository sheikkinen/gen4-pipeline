# User Story: Video Generation Script for gen4

## Title
Create a script to generate videos using gen4, based on samples/kling-sample.txt and existing image generation code

## As a
Developer or creative user

## I want
A script that can generate videos using the gen4 pipeline, leveraging the approach in `samples/kling-sample.txt` and the current image generation scripts

## So that
- I can automate video asset creation for projects
- The workflow is consistent with image generation
- The process is reproducible and testable

## Acceptance Criteria
- A script exists in `src/` that generates videos using gen4
- The script supports CLI arguments for prompt, output, and other relevant options
- Output videos are saved to a dedicated folder (e.g., `novel/videos/`)
- The script is documented and tested
- Example usage is provided
