// generate-videos.mjs
// Script to generate video assets using gen4 pipeline (Replicate API)

import Replicate from "replicate";
import fs from "node:fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";

// Load environment variables from .env if present
dotenv.config();

const argv = yargs(hideBin(process.argv))
  .option("prompt", {
    alias: "p",
    type: "string",
    description: "Prompt for video generation",
    demandOption: true
  })
  .option("output", {
    alias: "o",
    type: "string",
    default: "./novel/videos",
    description: "Output folder for generated videos"
  })
  .option("duration", {
    alias: "d",
    type: "number",
    default: 5,
    description: "Duration of the video in seconds"
  })
  .option("resolution", {
    alias: "r",
    type: "string",
    default: "720p",
    description: "Video resolution (not used by this model, kept for compatibility)"
  })
  .option("mode", {
    alias: "m",
    type: "string",
    default: "standard",
    description: "Kling mode (standard, ...), see model docs"
  })
  .option("negative_prompt", {
    alias: "n",
    type: "string",
    default: "",
    description: "Negative prompt for Kling video generation"
  })
  .option("start_image", {
    alias: "s",
    type: "string",
    description: "Path to a start image (PNG) to use as the first frame or reference for video generation"
  })
  .help()
  .argv;

if (!fs.existsSync(argv.output)) {
  fs.mkdirSync(argv.output, { recursive: true });
  console.log(`Created output directory: ${argv.output}`);
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const model = "kwaivgi/kling-v2.1";
const input = {
  mode: argv.mode,
  prompt: argv.prompt,
  duration: argv.duration,
  negative_prompt: argv.negative_prompt
};
if (argv.start_image) {
  // For Kling, try uploading the image to a public URL or use as file path if supported
  // Here, we use base64 as before, but Kling may require a URL
  const startImagePath = path.resolve(argv.start_image);
  if (fs.existsSync(startImagePath)) {
    // TODO: If Kling requires a URL, user must provide a URL or you must upload it somewhere
    // For now, try base64 (may fail if model does not support it)
    const imageData = fs.readFileSync(startImagePath);
    input.start_image = `data:image/png;base64,${imageData.toString('base64')}`;
    console.log(`Added start image as base64: ${startImagePath}`);
  } else {
    console.warn(`Start image not found: ${startImagePath}`);
  }
}

async function main() {
  try {
    const output = await replicate.run(model, { input });
    const url = Array.isArray(output) ? output[0] : output;
    console.log("Video URL:", url);
    const timestamp = Date.now();
    const outPath = path.join(argv.output, `video-${timestamp}.mp4`);
    const response = await axios({ url, method: "GET", responseType: "stream" });
    await new Promise((resolve, reject) => {
      const stream = response.data.pipe(fs.createWriteStream(outPath));
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
    console.log(`Video saved to ${outPath}`);
    // Save prompt metadata as a sidecar .txt file
    const metaPath = outPath.replace(/\.mp4$/, '.txt');
    fs.writeFileSync(metaPath, argv.prompt);
    console.log(`Prompt metadata saved to ${metaPath}`);
  } catch (err) {
    console.error("Error generating video:", err);
    process.exitCode = 1;
  }
}

main();

// 
// Usage:
// 1. Set REPLICATE_API_TOKEN in your environment or .env file.
// 2. Run: node src/generate-videos.mjs --prompt "A cinematic landscape, sunrise, anime style" --start_image novel/scenes/scene-1751697523343.png --output novel/videos --duration 5
