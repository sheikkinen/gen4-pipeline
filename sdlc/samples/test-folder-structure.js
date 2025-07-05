// test-folder-structure.js
// Automated test for verifying initial project folder structure

const fs = require('fs');
const path = require('path');

function checkExists(p, type = 'file') {
  if (type === 'dir') {
    if (!fs.existsSync(p) || !fs.statSync(p).isDirectory()) {
      throw new Error(`Missing directory: ${p}`);
    }
  } else {
    if (!fs.existsSync(p) || !fs.statSync(p).isFile()) {
      throw new Error(`Missing file: ${p}`);
    }
  }
}

try {
  // Root level
  checkExists('samples', 'dir');
  checkExists('src', 'dir');
  checkExists('sdlc', 'dir');
  checkExists('README.md');
  checkExists('.github/copilot-instructions.md');

  // Sample script file moved to samples/
  checkExists(path.join('samples', 'hidream-replicate.mjs'));

  // SDLC folder
  checkExists(path.join('sdlc', 'architecture.md'));
  checkExists(path.join('sdlc', 'vision.md'));
  checkExists(path.join('sdlc', 'backlog.md'));
  checkExists(path.join('sdlc', 'user-stories'), 'dir');
  checkExists(path.join('sdlc', 'solution-descriptions'), 'dir');

  console.log('All required files and folders are present.');
  process.exit(0);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
