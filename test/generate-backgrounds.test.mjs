// generate-backgrounds.test.mjs
// Jest test for gen4-image-generator.mjs (background mode)

import { exec } from 'child_process';
import fs from 'fs';
import { exiftool } from 'exiftool-vendored';
import { describe, it, expect } from '@jest/globals';
import path from 'path';

const resultsDir = './novel/backgrounds';
const prompt = 'A test background for visual novel.';
const outputPath = path.join(resultsDir, `test-background-${Date.now()}.png`);
const command = `node src/gen4-image-generator.mjs --prompt "${prompt}" --output "${outputPath}"`;

describe('gen4-image-generator.mjs (background)', () => {
  it('should create the output folder, save the image, and write metadata', (done) => {
    exec(command, async (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(fs.existsSync(outputPath)).toBe(true);
      const metadata = await exiftool.read(outputPath);
      expect(metadata.Description).toBe(prompt);
      done();
    });
  }, 120000);
});
