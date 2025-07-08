// modify-image.mjs
// Stand-alone script to modify images using the Flux Kontext model via Replicate API

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
    description: "Modification prompt (e.g. 'Change the car color to red')",
    demandOption: true
  })
  .option("input_image", {
    alias: "i",
    type: "string",
    description: "Input image URL or local file path"
  })
  .option("output", {
    alias: "o",
    type: "string",
    description: "Output file path for the modified image"
  })
  .option("guidance", {
    type: "number",
    default: 2.5,
    description: "Guidance scale (default: 2.5)"
  })
  .option("go_fast", {
    type: "boolean",
    default: true,
    description: "Use fast mode (default: true)"
  })
  .option("aspect_ratio", {
    type: "string",
    default: "match_input_image",
    description: "Aspect ratio (default: match_input_image)"
  })
  .option("output_format", {
    type: "string",
    default: "jpg",
    description: "Output format (default: jpg)"
  })
  .option("output_quality", {
    type: "number",
    default: 80,
    description: "Output quality (default: 80)"
  })
  .option("disable_safety_checker", {
    type: "boolean",
    default: true,
    description: "Disable safety checker (default: true)"
  })
  .option("num_inference_steps", {
    type: "number",
    default: 30,
    description: "Number of inference steps (default: 30)"
  })
  .option("local_image", {
    alias: "l",
    type: "string",
    description: "Path to a local image file to use as input (will be base64-encoded and passed as input_image)"
  })
  .check(argv => {
    if (!argv.input_image && !argv.local_image) {
      throw new Error('You must provide either --input_image (URL) or --local_image (file path)');
    }
    if (argv.input_image && argv.local_image) {
      throw new Error('Please provide only one of --input_image or --local_image, not both.');
    }
    return true;
  })
  .help()
  .argv;

const replicate = new Replicate({ apiKey: process.env.REPLICATE_API_TOKEN });

async function getInputImageUrl(input, localImage) {
  if (localImage) {
    const localImagePath = path.resolve(localImage);
    const imageData = fs.readFileSync(localImagePath);
    const base64Image = `data:image/png;base64,${imageData.toString('base64')}`;
    console.log(`Using local image as base64 input: ${localImagePath}`);
    return base64Image;
  }
  if (/^https?:\/\//.test(input)) {
    return input;
  }
  throw new Error("Provide either --input_image as a URL or --local_image as a local file path.");
}

async function main() {
  const inputImageUrl = await getInputImageUrl(argv.input_image, argv.local_image);
  const input = {
    prompt: argv.prompt,
    go_fast: argv.go_fast,
    guidance: argv.guidance,
    input_image: inputImageUrl,
    aspect_ratio: argv.aspect_ratio,
    output_format: argv.output_format,
    output_quality: argv.output_quality,
    disable_safety_checker: argv.disable_safety_checker,
    num_inference_steps: argv.num_inference_steps
  };

  const output = await replicate.run("black-forest-labs/flux-kontext-dev", { input });
  console.log('Done!', output);
  // If output is a stream, pipe it to file
  const outPath = argv.output || `output_${Date.now()}.jpg`;
  if (output && typeof output.pipe === 'function') {
    const writeStream = fs.createWriteStream(outPath);
    output.pipe(writeStream);
    writeStream.on('finish', () => {
      console.log(`Image saved to ${outPath}`);
      process.exit(0);
    });
    writeStream.on('error', (err) => {
      console.error('Error writing image:', err);
      process.exit(1);
    });
    return;
  }
  // If output is a web ReadableStream, convert to buffer and write to file
  if (output && typeof output.getReader === 'function') {
    const reader = output.getReader();
    const chunks = [];
    let done, value;
    while (true) {
      ({ done, value } = await reader.read());
      if (done) break;
      chunks.push(value);
    }
    const buffer = Buffer.concat(chunks);
    fs.writeFileSync(outPath, buffer);
    console.log(`Image saved to ${outPath}`);
    process.exit(0);
  }
  // If output is a URL or array, fallback to previous logic
  const imageUrl = Array.isArray(output) ? output[0] : output;
  if (typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(outPath, response.data);
    console.log(`Image saved to ${outPath}`);
    process.exit(0);
  }
  throw new Error('No valid image output from model');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
