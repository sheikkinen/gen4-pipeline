// gen4-image-generator.mjs
// Stand-alone script to generate images using gen4 via Replicate API

import Replicate from "replicate";
import fs from "node:fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import dotenv from "dotenv";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { exiftool } from "exiftool-vendored";
import path from "path";

// Load environment variables from .env if present
dotenv.config();

const argv = yargs(hideBin(process.argv))
  .option("prompt", {
    alias: "p",
    type: "string",
    description: "Prompt for image generation",
    demandOption: true
  })
  .option("mode", {
    alias: "m",
    type: "string",
    choices: ["fast", "normal", "dev"],
    default: "fast",
    description: "Model mode: fast, normal, or dev"
  })
  .option("output", {
    alias: "o",
    type: "string",
    description: "Output file path for the generated image"
  })
  .option("resolution", {
    alias: "r",
    type: "string",
    choices: [
      "720p",
      "1080p"
    ],
    default: "1080p",
    description: "Image resolution (only '720p' or '1080p' allowed for runwayml/gen4-image)"
  })
  .option("reference_tags", {
    alias: "t",
    type: "array",
    description: "Reference tags (comma separated or multiple --reference_tags)"
  })
  .option("reference_images", {
    alias: "i",
    type: "array",
    description: "Reference image URLs (comma separated or multiple --reference_images)"
  })
  .help()
  .argv;

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Use a single model for all modes, as in the sample
const model = "runwayml/gen4-image";

const input = {
  prompt: argv.prompt,
  resolution: argv.resolution,
  aspect_ratio: "4:3",
  reference_tags: argv.reference_tags || [],
  reference_images: argv.reference_images || []
};

async function main() {
  try {
    const output = await replicate.run(model, { input });
    const url = Array.isArray(output) ? output[0] : output;
    console.log("Image URL:", url);
    if (argv.output) {
      const outputDir = path.dirname(argv.output);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Created output directory: ${outputDir}`);
      }
      const response = await axios({ url, method: "GET", responseType: "stream" });
      const outPath = argv.output.endsWith('.png') ? argv.output : `${argv.output}-${uuidv4()}.png`;
      const stream = response.data.pipe(fs.createWriteStream(outPath));
      stream.on('finish', async () => {
        console.log(`Image saved to ${outPath}`);
        // Add prompt as metadata
        try {
          await exiftool.write(outPath, { Description: argv.prompt });
          console.log('Prompt metadata written to image.');
        } catch (metaErr) {
          console.error('Failed to write metadata:', metaErr);
        } finally {
          await exiftool.end();
        }
      });
    }
  } catch (err) {
    console.error("Error generating image:", err);
  }
}

main();

// Usage:
// 1. Set REPLICATE_API_TOKEN in your environment or .env file.
// 2. Run: node src/gen4-image-generator.mjs --prompt "your prompt here" --mode fast --output ./output.png
//
// Example with all options (from sample):
// node src/gen4-image-generator.mjs \
//   --prompt "a close up portrait of @woman and @man standing in @park, hands in pockets, looking cool. She is wearing her pink sweater and bangles." \
//   --mode fast \
//   --resolution "832 × 1248 (Portrait)" \
//   --output ./output.png \
//   --reference_tags park woman man \
//   --reference_images "https://replicate.delivery/pbxt/NHVhGWPplgrmOE8EGTVhbeSqWuZBcZLHyMQrgrTH4Hpa1ljU/m4hjkmbk79rma0cqrnxt67cqnw.jpg" \
//   --reference_images "https://replicate.delivery/pbxt/NHVhFhdxAAmuXKUyT4r10KIalYrXf9vp5B40CmAeXlPieuOs/w99em95b01rmc0cqrny8chf49w.jpg" \
//   --reference_images "https://replicate.delivery/pbxt/NHVhGE5GSJlAfL9RkGFvUbx70KVl7l7KamUNLHOAUd1sQVuF/psjdbkzgm1rmc0cqrnysbg93cm.jpg"
