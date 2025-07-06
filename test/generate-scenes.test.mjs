// generate-scenes.test.mjs
// Jest test for gen4-image-generator.mjs (scene mode)

import { exec } from 'child_process';
import fs from 'fs';
import { exiftool } from 'exiftool-vendored';
import { describe, it, expect } from '@jest/globals';
import path from 'path';

const resultsDir = './novel/scenes';
const charPrompt = 'A test character for visual novel.';
const bgPrompt = 'A test background for visual novel.';
const scenePrompt = 'A test scene for visual novel.';

function getLatestPng(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  return files.map(f => ({f, t: fs.statSync(path.join(dir, f)).mtimeMs}))
    .sort((a, b) => b.t - a.t)[0]?.f;
}

describe('gen4-image-generator.mjs (scene)', () => {
  it('should create the output folder, save the image, and write metadata', (done) => {
    // Generate character
    const charOut = path.join(resultsDir, `test-char-${Date.now()}.png`);
    const charCommand = `node src/gen4-image-generator.mjs --prompt "${charPrompt}" --output "${charOut}"`;
    exec(charCommand, () => {
      // Generate background
      const bgOut = path.join(resultsDir, `test-bg-${Date.now()}.png`);
      const bgCommand = `node src/gen4-image-generator.mjs --prompt "${bgPrompt}" --output "${bgOut}"`;
      exec(bgCommand, () => {
        // Generate scene using both
        const sceneOut = path.join(resultsDir, `test-scene-${Date.now()}.png`);
        const sceneCommand = `node src/gen4-image-generator.mjs --prompt "${scenePrompt}" --local_image "${charOut}" --local_image "${bgOut}" --output "${sceneOut}"`;
        exec(sceneCommand, async (error, stdout, stderr) => {
          expect(error).toBeNull();
          expect(fs.existsSync(sceneOut)).toBe(true);
          const metadata = await exiftool.read(sceneOut);
          expect(metadata.Description).toBe(scenePrompt);
          done();
        });
      });
    });
  }, 180000);
});
