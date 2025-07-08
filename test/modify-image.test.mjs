// modify-image.test.mjs
// Test for modify-image.mjs CLI script (ESM)

import { exec } from 'child_process';
import fs from 'fs';
import { describe, it, expect } from '@jest/globals';

const outputPath = './output/modified-image-test.png';
const prompt = 'make the image look like a watercolor painting';
const inputImageUrl = 'https://replicate.delivery/pbxt/NHVhGE5GSJlAfL9RkGFvUbx70KVl7l7KamUNLHOAUd1sQVuF/psjdbkzgm1rmc0cqrnysbg93cm.jpg';
const command = `node src/modify-image.mjs --prompt "${prompt}" --input_image "${inputImageUrl}" --output ${outputPath}`;

describe('modify-image', () => {
  it('should save the modified image to the output path', (done) => {
    exec(command, (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(fs.existsSync(outputPath)).toBe(true);
      done();
    });
  }, 180000); // Set timeout to 180 seconds
});
