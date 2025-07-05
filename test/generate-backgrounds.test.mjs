// generate-backgrounds.test.mjs
// Jest test for generate-backgrounds.mjs

import { exec } from 'child_process';
import fs from 'fs';
import { exiftool } from 'exiftool-vendored';
import { describe, it, expect } from '@jest/globals';

const outputPath = './backgrounds/test-background.png';
const prompt = 'A test background for visual novel.';
const command = `node src/generate-backgrounds.mjs --prompt "${prompt}" --output ${outputPath}`;

describe('generate-backgrounds.mjs', () => {
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
