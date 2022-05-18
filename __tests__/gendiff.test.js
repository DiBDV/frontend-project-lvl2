import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__tests__/__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff flat file', () => {
    expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toBe(
        readFile('expected_01.txt'));
    expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish')).toBe(
        readFile('expected_01.txt'));
});

test('gendiff recursion stylish', () => {
    expect(gendiff(getFixturePath('file1_recursion.json'), getFixturePath('file2_recursion.json'), 'stylish')).toBe(
        readFile('expected_02_stylish.txt'));
    expect(gendiff(getFixturePath('file1_recursion.yml'), getFixturePath('file2_recursion.yml'), 'stylish')).toBe(
        readFile('expected_02_stylish.txt'));
});

test('gendiff recursion plain', () => {
    expect(gendiff(getFixturePath('file1_recursion.json'), getFixturePath('file2_recursion.json'), 'plain')).toBe(
        readFile('expected_03_plain.txt'));
    expect(gendiff(getFixturePath('file1_recursion.yml'), getFixturePath('file2_recursion.yml'), 'plain')).toBe(
        readFile('expected_03_plain.txt'));
});

test('gendiff recursion json', () => {
    expect(gendiff(getFixturePath('file1_recursion.json'), getFixturePath('file2_recursion.json'), 'json')).toBe(
        readFile('expected_04_json.txt'));
    expect(gendiff(getFixturePath('file1_recursion.yml'), getFixturePath('file2_recursion.yml'), 'json')).toBe(
        readFile('expected_04_json.txt'));
});