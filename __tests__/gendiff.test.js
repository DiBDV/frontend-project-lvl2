import path from "path";
import fs from "fs";
import gendiff from "../src/index.js";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__tests__/__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test("gendiff flat file", () => {
    expect(gendiff("__tests__/__fixtures__/file1.json", "__tests__/__fixtures__/file2.json", "json")).toBe(
      readFile("expected_01.txt"));
    expect(gendiff("__tests__/__fixtures__/file1.yaml", "__tests__/__fixtures__/file2.yaml", "yaml")).toBe(
      readFile("expected_01.txt"));
    });

test("gendiff recursion", () => {
    expect(gendiff("__tests__/__fixtures__/file1_recursion.json", "__tests__/__fixtures__/file2_recursion.json", "json")).toBe(
      readFile("expected_02.txt"));
    expect(gendiff("__tests__/__fixtures__/file1_recursion.yml", "__tests__/__fixtures__/file2_recursion.yml", "yaml")).toBe(
      readFile("expected_02.txt"));
    });
