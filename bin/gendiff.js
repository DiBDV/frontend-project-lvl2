#!/usr/bin/env node

import * as fs from 'fs';
import { Command } from 'commander';

//commander.js integration to generate helper functionality

const program = new Command();


program.version('0.1.0');

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action( (filepath1, filepath2) => {   
    // const filepath1 = JSON.parse(file1)
    //move to index.js

      const file1 = fs.readFileSync(filepath1);
      const parsedFile1 = JSON.parse(file1);
      // NB to DO:
      // 1st - https://ru.hexlet.io/challenges/js_objects_operations_exercise
      // 2nd - https://ru.hexlet.io/challenges/js_trees_stringify_exercise

      // create parcer to call for both files and extra read function to read the files;
      // path.resolve() - absolute path to the file
      // и process.cwd() - to read current dir path. are Node.js modules (find !!)
      // check "three" module.
      // separete function to compare and draft the tree NB.

      const file2 = fs.readFileSync(filepath2);
      const parsedFile2 = JSON.parse(file2);



  });

program.parse(process.argv);

