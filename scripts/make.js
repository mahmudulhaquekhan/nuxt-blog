#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const [, , type, rawName] = process.argv;

if (!type || !rawName) {
  console.error('❌ Usage: npm run make <type> <name>');
  console.error('   Example: npm run make component ui/buttons/MyButton');
  process.exit(1);
}

const allowedTypes = ['component', 'page', 'layout', 'composable'];
if (!allowedTypes.includes(type)) {
  console.error(`❌ Invalid type. Allowed: ${allowedTypes.join(', ')}`);
  process.exit(1);
}

// Determine folder & extension
let baseFolder = '';
let extension = '.vue';

switch (type) {
  case 'component':
    baseFolder = 'components';
    break;
  case 'page':
    baseFolder = 'pages';
    break;
  case 'layout':
    baseFolder = 'layouts';
    break;
  case 'composable':
    baseFolder = 'composables';
    extension = '.ts'; // or '.ts' if you use TypeScript
    break;
}

let fileName = rawName.endsWith(extension) ? rawName : `${rawName}${extension}`;
const targetPath = path.join(process.cwd(), 'app', baseFolder, fileName);
const targetDir = path.dirname(targetPath);

// Create directories if needed
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

if (fs.existsSync(targetPath)) {
  console.error(`❌ ${type} "${fileName}" already exists!`);
  process.exit(1);
}

const nameWithoutExt = path.basename(fileName, extension);

// Templates
let template = '';
if (type === 'component' || type === 'page' || type === 'layout') {
  template = `<script setup lang="ts">

</script>

<template>
  
</template>
`;
} else if (type === 'composable') {
  template = `export function ${nameWithoutExt}() {
  // composable logic here
}
`;
}

fs.writeFileSync(targetPath, template);
console.log(`✅ Created ${type}: app/${baseFolder}/${fileName}`);
