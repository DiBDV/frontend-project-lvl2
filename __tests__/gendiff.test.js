import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__tests__/__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1_recursion.json', 'file2_recursion.json', 'stylish', 'expected_02_stylish'],
  ['file1_recursion.yml', 'file2_recursion.yml', 'plain', 'expected_03_plain'],
  ['file1_recursion.yml', 'file2_recursion.json', 'json', 'expected_04_json'],
])('Show diff %s vs %s with %s formatting', (file1, file2, format, expectedResult) => {
  const result = gendiff(getFixturePath(file1), getFixturePath(file2), format);
  expect(result).toBe(readFile(`${expectedResult}.txt`));
});
