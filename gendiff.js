#!/usr/bin/env node

//commander.js to generate helper functionality

const commander = require('../'); // to include commander in git clone
const program = new commnader.Command();

program
  .description('Compares two configuration files and shows a difference.')
  .name("gendiff")
  .usage("[options]")
  .option('-V, --version', 'output the version number')
  .option('-h, --help', 'output usage information');

program.parse(process.argv);


