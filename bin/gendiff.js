#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/index.js';


//commander.js integration to generate helper functionality
const program = new Command();


program.version('0.1.0');

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action( (filepath1, filepath2) => {
   const result = gendiff(filepath1, filepath2, program.format);
   console.log(result);
  });

program.parse(process.argv);