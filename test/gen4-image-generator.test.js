// gen4-image-generator.test.js
// Test for output folder creation and metadata writing

import { exec } from 'child_process';
import fs from 'fs';
import { exiftool } from 'exiftool-vendored';

describe('gen4-image-generator', () => {
  const outputPath = './output/test-metadata.png';
  const prompt = 'a close up portrait of @woman and @man standing in @park, hands in pockets, looking cool. She is wearing her pink sweater and bangles.';
  const command = `node src/gen4-image-generator.mjs --prompt "${prompt}" --resolution 1080p --output ${outputPath} --reference_tags park woman man --reference_images "https://replicate.delivery/pbxt/NHVhGWPplgrmOE8EGTVhbeSqWuZBcZLHyMQrgrTH4Hpa1ljU/m4hjkmbk79rma0cqrnxt67cqnw.jpg" --reference_images "https://replicate.delivery/pbxt/NHVhFhdxAAmuXKUyT4r10KIalYrXf9vp5B40CmAeXlPieuOs/w99em95b01rmc0cqrny8chf49w.jpg" --reference_images "https://replicate.delivery/pbxt/NHVhGE5GSJlAfL9RkGFvUbx70KVl7l7KamUNLHOAUd1sQVuF/psjdbkzgm1rmc0cqrnysbg93cm.jpg"`;

  it('should create the output folder, save the image, and write metadata', (done) => {
    exec(command, async (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(fs.existsSync(outputPath)).toBe(true);
      const metadata = await exiftool.read(outputPath);
      expect(metadata.Description).toBe(prompt);
      done();
    });
  });
});
