#!/usr/bin/env node

import program from 'commander';
import gendiff from '../src/index.js';


//commander.js integration to generate helper functionality
// const program = new Command();


program
  .description('Compares two configuration files and shows the difference.')
  .version('0.7.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action( (filepath1, filepath2) => {
    const result = gendiff(filepath1, filepath2, program.opts().format);
    console.log(result);
  });

program.parse(process.argv);
