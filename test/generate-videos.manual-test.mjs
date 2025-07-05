// generate-videos.test.mjs
// Jest test for generate-videos.mjs

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { describe, it, expect } from '@jest/globals';

const resultsDir = './novel/videos';
const prompt = 'A test video for visual novel.';
const startImage = 'novel/scenes/scene-1751697523343.png'; // Use a valid PNG from scenes
const command = `node src/generate-videos.mjs --prompt "${prompt}" --output ${resultsDir} --duration 5 --start_image ${startImage}`;

describe('generate-videos.mjs', () => {
  it('should create the output folder, save the video, and write prompt metadata', (done) => {
    exec(command, async (error, stdout, stderr) => {
      // Find the most recent MP4 in resultsDir
      const files = fs.readdirSync(resultsDir).filter(f => f.endsWith('.mp4'));
      const latest = files.map(f => ({f, t: fs.statSync(path.join(resultsDir, f)).mtimeMs}))
        .sort((a, b) => b.t - a.t)[0]?.f;
      const latestPath = latest ? path.join(resultsDir, latest) : null;
      expect(error).toBeNull();
      expect(latestPath && fs.existsSync(latestPath)).toBe(true);
      // Check sidecar .txt file for prompt
      const metaPath = latestPath.replace(/\.mp4$/, '.txt');
      expect(fs.existsSync(metaPath)).toBe(true);
      const meta = fs.readFileSync(metaPath, 'utf8');
      expect(meta).toBe(prompt);
      done();
    });
  }, 300000); // 5 minutes timeout
});
