#!/usr/bin/env node

import * as fs from 'fs';
import { Command } from 'commander';

//commander.js integration to generate helper functionality

const program = new Command();


program.version('0.0.1');

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action( (filepath1, filepath2) => {   
    // const filepath1 = JSON.parse(file1)
    //move to index.js
    try {
      const file1 = fs.readFileSync(filepath1);
      const parsedFile1 = JSON.parse(file1);
      //create parcer to call for both files and extra read function to read the files;
      // path.resolve() и process.cwd() are Node.js modules (find !!)
      // check "three" module.
      // separete function to compare and draft the treee NB.
      
      console.log(parsedFile1);
    } catch (e) {
      console.log(e);
    }
    try {
      const file2 = fs.readFileSync(filepath2);
      const parsedFile2 = JSON.parse(file2);
      console.log(parsedFile2);
    } catch (e) {
      console.log(e);
    }
  });

program.parse(process.argv);

