// generate-audio.mjs
// Script to generate audio using Replicate's sepal/audiogen model

import Replicate from "replicate";
import fs from "node:fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";

dotenv.config();

const argv = yargs(hideBin(process.argv))
  .option("prompt", {
    alias: "p",
    type: "string",
    description: "Prompt for audio generation",
    demandOption: true
  })
  .option("duration", {
    alias: "d",
    type: "number",
    default: 5,
    description: "Duration of the audio in seconds"
  })
  .option("output", {
    alias: "o",
    type: "string",
    description: "Output file path for the generated audio (e.g., output.mp3)",
    demandOption: true
  })
  .help()
  .argv;

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function main() {
  try {
    const output = await replicate.run(
      "sepal/audiogen:154b3e5141493cb1b8cec976d9aa90f2b691137e39ad906d2421b74c2a8c52b8",
      {
        input: {
          top_k: 250,
          top_p: 0,
          prompt: argv.prompt,
          duration: argv.duration,
          temperature: 1,
          output_format: "mp3",
          classifier_free_guidance: 3
        }
      }
    );
    const url = Array.isArray(output) ? output[0] : output;
    const outputDir = path.dirname(argv.output);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`Created output directory: ${outputDir}`);
    }
    const response = await axios({ url, method: "GET", responseType: "stream" });
    await new Promise((resolve, reject) => {
      const stream = response.data.pipe(fs.createWriteStream(argv.output));
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
    console.log(`Audio saved to ${argv.output}`);
  } catch (err) {
    console.error("Error generating audio:", err);
    process.exitCode = 1;
  }
}

main();
