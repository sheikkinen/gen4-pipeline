// generate-scenes.test.mjs
// Jest test for generate-scenes.mjs

import { exec } from 'child_process';
import fs from 'fs';
import { exiftool } from 'exiftool-vendored';
import { describe, it, expect } from '@jest/globals';
import path from 'path';

const resultsDir = './novel/scenes';
const charPrompt = 'A test character for visual novel.';
const bgPrompt = 'A test background for visual novel.';
const scenePrompt = 'A test scene for visual novel.';

const charCommand = `node src/generate-characters.mjs --prompt "${charPrompt}" --output ${resultsDir}`;
const bgCommand = `node src/generate-backgrounds.mjs --prompt "${bgPrompt}" --output ${resultsDir}`;

function getLatestPng(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  return files.map(f => ({f, t: fs.statSync(path.join(dir, f)).mtimeMs}))
    .sort((a, b) => b.t - a.t)[0]?.f;
}

describe('generate-scenes.mjs', () => {
  it('should create the output folder, save the image, and write metadata', (done) => {
    exec(charCommand, () => {
      exec(bgCommand, () => {
        const charPath = path.join(resultsDir, getLatestPng(resultsDir));
        const bgPath = path.join(resultsDir, getLatestPng(resultsDir));
        const sceneCommand = `node src/generate-scenes.mjs --prompt "${scenePrompt}" --reference_images ${charPath} ${bgPath} --output ${resultsDir}`;
        exec(sceneCommand, async (error, stdout, stderr) => {
          const scenePath = path.join(resultsDir, getLatestPng(resultsDir));
          expect(error).toBeNull();
          expect(scenePath && fs.existsSync(scenePath)).toBe(true);
          const metadata = await exiftool.read(scenePath);
          expect(metadata.Description).toBe(scenePrompt);
          done();
        });
      });
    });
  }, 180000);
});
