#!/usr/bin/env node

//commander.js integration to generate helper functionality

const { Command } = require ('commander');
const program = new Command();


program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'the path to the first file')
  .argument('<filepath2>', 'the path to the second file')
  //.command('<filepath1>', '<filepath2>')
  .option('-f, --format [type]', 'output format')
  //.action((filepath1, filepath2) => {   
   // })
  .parse();


