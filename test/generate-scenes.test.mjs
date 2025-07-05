// generate-scenes.test.mjs
// Jest test for generate-scenes.mjs

import { exec } from 'child_process';
import fs from 'fs';
import { exiftool } from 'exiftool-vendored';
import { describe, it, expect } from '@jest/globals';

const charPath = './characters/test-character.png';
const bgPath = './backgrounds/test-background.png';
const outputPath = './scenes/test-scene.png';
const prompt = 'A test scene for visual novel.';
const command = `node src/generate-scenes.mjs --prompt "${prompt}" --reference_images ${charPath} ${bgPath} --output ${outputPath}`;

describe('generate-scenes.mjs', () => {
  it('should create the output folder, save the image, and write metadata', (done) => {
    exec(command, async (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(fs.existsSync(outputPath)).toBe(true);
      const metadata = await exiftool.read(outputPath);
      expect(metadata.Description).toBe(prompt);
      done();
    });
  }, 180000);
});
