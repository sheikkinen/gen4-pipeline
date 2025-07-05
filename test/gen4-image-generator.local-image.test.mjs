// gen4-image-generator.local-image.test.mjs
// Test for local image reference support (ESM)

import { exec } from 'child_process';
import fs from 'fs';
import { exiftool } from 'exiftool-vendored';
import { describe, it, expect } from '@jest/globals';

const outputPath = './output/local-image-jest-test.png';
const prompt = 'a close up portrait of @woman and @man standing in @park, hands in pockets, looking cool. She is wearing her pink sweater and bangles.';
const localImage = './input/lady.png';
const command = `node src/gen4-image-generator.mjs --prompt "${prompt}" --resolution 1080p --output ${outputPath} --reference_tags park woman man --local_image ${localImage}`;

describe('gen4-image-generator (local image)', () => {
  it('should create the output folder, save the image, and write metadata using a local image as reference', (done) => {
    exec(command, async (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(fs.existsSync(outputPath)).toBe(true);
      const metadata = await exiftool.read(outputPath);
      expect(metadata.Description).toBe(prompt);
      done();
    });
  }, 120000); // Set timeout to 2 minutes for slow API
});
