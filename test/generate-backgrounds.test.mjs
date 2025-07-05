// generate-backgrounds.test.mjs
// Jest test for generate-backgrounds.mjs

import { exec } from 'child_process';
import fs from 'fs';
import { exiftool } from 'exiftool-vendored';
import { describe, it, expect } from '@jest/globals';
import path from 'path';

const resultsDir = './novel/backgrounds';
const outputPath = path.join(resultsDir, `test-background-${Date.now()}.png`);
const prompt = 'A test background for visual novel.';
const command = `node src/generate-backgrounds.mjs --prompt "${prompt}" --output ${resultsDir}`;

describe('generate-backgrounds.mjs', () => {
  it('should create the output folder, save the image, and write metadata', (done) => {
    exec(command, async (error, stdout, stderr) => {
      // Find the most recent PNG in resultsDir
      const files = fs.readdirSync(resultsDir).filter(f => f.endsWith('.png'));
      const latest = files.map(f => ({f, t: fs.statSync(path.join(resultsDir, f)).mtimeMs}))
        .sort((a, b) => b.t - a.t)[0]?.f;
      const latestPath = latest ? path.join(resultsDir, latest) : null;
      expect(error).toBeNull();
      expect(latestPath && fs.existsSync(latestPath)).toBe(true);
      const metadata = await exiftool.read(latestPath);
      expect(metadata.Description).toBe(prompt);
      done();
    });
  }, 120000);
});
