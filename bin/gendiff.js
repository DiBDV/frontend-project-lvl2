#!/usr/bin/env node

import { Command } from 'commander';
import { getFileContent } from '../src/get-file-content.js';
import { parse, buildDiff, renderDiff } from '../src/index.js';


//commander.js integration to generate helper functionality
const program = new Command();


program.version('0.1.0');

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action( (filepath1, filepath2) => {
    const file1Content = getFileContent(filepath1);
    const file2Content = getFileContent(filepath2);

    const obj1 = parse(file1Content);
    const obj2 = parse(file2Content);
    const diff = buildDiff(obj1, obj2);
    const result = renderDiff(diff, program.format);
    console.log(result);
  });

program.parse(process.argv);