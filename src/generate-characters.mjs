// generate-characters.mjs
// Script to generate character images for Visual Novel using gen4 pipeline

import { execSync } from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import path from 'path';

const argv = yargs(hideBin(process.argv))
  .option('prompt', {
    alias: 'p',
    type: 'string',
    description: 'Prompt for character image generation',
    demandOption: true
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    default: './novel/characters',
    description: 'Output folder for generated character images'
  })
  .help()
  .argv;

if (!fs.existsSync(argv.output)) {
  fs.mkdirSync(argv.output, { recursive: true });
  console.log(`Created output directory: ${argv.output}`);
}

const timestamp = Date.now();
const outPath = path.join(argv.output, `character-${timestamp}.png`);
const command = `node src/gen4-image-generator.mjs --prompt "${argv.prompt}" --output "${outPath}"`;
console.log('Running:', command);
execSync(command, { stdio: 'inherit' });
