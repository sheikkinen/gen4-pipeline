// generate-audio.test.mjs
// Jest test for generate-audio.mjs

import { exec } from 'child_process';
import fs from 'fs';

describe('generate-audio.mjs', () => {
  const outputFile = 'samples/test-audio-automated.mp3';
  afterAll(() => {
    if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
  });

  it('generates an audio file from a prompt', done => {
    // Note: First model boot may take up to 60 seconds
    exec(
      'node src/generate-audio.mjs --prompt "test sound: wind and birds" --duration 3 --output ' + outputFile,
      { timeout: 120000 }, // 2 min timeout for cold start
      (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(fs.existsSync(outputFile)).toBe(true);
        const stats = fs.statSync(outputFile);
        expect(stats.size).toBeGreaterThan(1000); // Should not be empty
        done();
      }
    );
  }, 120000); // <-- Set Jest timeout to 2 minutes
});
