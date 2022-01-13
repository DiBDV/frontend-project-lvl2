#!/usr/bin/env node

//commander.js integration to generate helper functionality

const { Command } = require ('commander');
const program = new Command();


program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .parse();


