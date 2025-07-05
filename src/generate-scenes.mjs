// generate-scenes.mjs
// Script to generate scene images for Visual Novel using gen4 pipeline

import { execSync } from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import path from 'path';

const argv = yargs(hideBin(process.argv))
  .option('prompt', {
    alias: 'p',
    type: 'string',
    description: 'Prompt for scene image generation',
    demandOption: true
  })
  .option('reference_images', {
    alias: 'i',
    type: 'array',
    description: 'Paths to character and background images to use as references',
    demandOption: true
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    default: './scenes',
    description: 'Output folder for generated scene images'
  })
  .help()
  .argv;

if (!fs.existsSync(argv.output)) {
  fs.mkdirSync(argv.output, { recursive: true });
  console.log(`Created output directory: ${argv.output}`);
}

const outPath = path.join(argv.output, `scene-${Date.now()}.png`);
const refs = argv.reference_images.map(img => `--local_image ${img}`).join(' ');
const command = `node src/gen4-image-generator.mjs --prompt "${argv.prompt}" ${refs} --output ${outPath}`;
console.log('Running:', command);
execSync(command, { stdio: 'inherit' });
