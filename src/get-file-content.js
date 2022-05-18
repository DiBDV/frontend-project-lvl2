import * as fs from 'fs';
import { resolve } from 'path';

const getFileContent = (filepath) => {
  try {
    return fs.readFileSync(resolve(filepath), 'utf8');
  } catch (error) {
    console.log(error);
    throw new Error(`File ${filepath} not found`);
  }
};

export default getFileContent;
