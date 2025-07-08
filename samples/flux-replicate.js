// node flux-replicate.js prompts/1.txt kali2

import Replicate from 'replicate';
import dotenv from 'dotenv';
import fs from 'fs';
import axios from 'axios';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function addMetadataToFile(imagePath, prompt) {
  try {
    const command = `exiftool -overwrite_original -Description="${prompt}" ${imagePath}`;
    const { stdout, stderr } = await execAsync(command);
    if (stderr) {
      console.error('Error writing metadata:', stderr);
    } else {
      console.log('Metadata written successfully:', stdout);
    }
  } catch (error) {
    console.error('Failed to write metadata:', error);
  }
}

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: 'https://www.npmjs.com/package/create-replicate'
});

// Get the prompt file and model type from command-line arguments
const promptsFilePath = process.argv[2];
const modelType = process.argv[3];

if (!promptsFilePath) {
  console.error('Error: No prompt file specified.');
  process.exit(1);
}

if (!modelType) {
  console.error('Error: No model type specified.');
  process.exit(1);
}

const models = {
  reunier: "sheikkinen/flux_lora_reunier:eff5adcd53569bd70d8f810d9df34718185dbef5f38f7c2b0f31092d28536ac1",
  katja: "sheikkinen/flux_lora_katja1:ee5dc971517d1b46cd35670b834e083d85a26861afca7304ad7abbfb17e763ad",
  tuija: "sheikkinen/flux_lora_tuija1:4b0fa9b8819dc1f063c873b7584e2567cd49b7dc6c3a69ab5fa1d99f5fd8419f",
  nina: "sheikkinen/flux_lora_nina1:0f394af7d5a4c171e0d628d475a9bbb51df81f4007befa684cae74dacc4dd07d",
  sami: "sheikkinen/flux_lora_sami1:8de18b11910f077751ba824ab89b84601694cdbd91e1c83dd6e110b06ef3092e",
  kali: "sheikkinen/flux_lora_kali1:4d0c7fb74f90abb18b5c9d825c7382a041bf04ef8f3074c8f09ff4cb8bcbb4ec",
  kali2: "sheikkinen/flux_lora_kali2:351c00e8bf3bfa9585be81f07fd696f5c555de95d2efc90ebf00ee3919c686ce",
  pro: "black-forest-labs/flux-1.1-pro-ultra",
  google: "google/imagen-3"
};

const model = models[modelType.toLowerCase()];

if (!model) {
  console.error('Error: Invalid model type provided.');
  process.exit(1);
}

const prompts = fs.readFileSync(promptsFilePath, 'utf-8').split('\n').filter(Boolean);

console.log('Using model: %s', model);

prompts.forEach(async (prompt, index) => {
  try {
    // Replace "TOK" with "new value" in the prompt
    const modifiedPrompt = prompt.replace("TOK", modelType.toLowerCase());

    const input = {
      model: "dev", // "schnell", //"dev",
      prompt: modifiedPrompt,
      lora_scale: 1.0,
      num_outputs: 1,
      aspect_ratio: "16:9",
      output_format: "png",
      guidance_scale: 3.5,
      output_quality: 90,
      num_inference_steps: 28,
      disable_safety_checker: true,
      safety_tolerance: 5,
      raw: true,
      safety_filter_level: "block_only_high"
    }; 

    console.log('With input: %O', input);
    console.log('Running...');

    const output = await replicate.run(model, { input });
    console.log('Done!', output);

    const imageUrl = Array.isArray(output) ? output[0] : output;
    const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
    const imagePath = path.join('/Volumes/Backup-2021/deviant-working/replicate', `${modelType}_${index}_${uniqueSuffix}.png`);

    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'stream'
    });

    const stream = response.data.pipe(fs.createWriteStream(imagePath));
    console.log(`Image saved to ${imagePath}`);
    
    stream.on('finish', () => {
        console.log(`Image saved to ${imagePath}`);
        addMetadataToFile(imagePath, prompt); // Call the function to write metadata  
      });
  } catch (apiError) {
    console.error('Error running Replicate model:', apiError);
  }
});
