#!/usr/bin/env node

// import {readFileSync} from 'fs';
import * as fs from 'fs';
import { Command } from 'commander';

//commander.js integration to generate helper functionality

// const { Command } = require ('commander');
const program = new Command();


program.version('0.0.1');

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action( (filepath1, filepath2) => {   
    // const filepath1 = JSON.parse(file1)
    try {
      const file1 = fs.readFileSync(filepath1);
      console.log(file1);
    } catch (e) {
      console.log(e);
    }
    try {
      const file2 = fs.readFileSync(filepath2);
    console.log(file2);
    } catch (e) {
      console.log(e);
    }
  });

program.parse(process.argv);


