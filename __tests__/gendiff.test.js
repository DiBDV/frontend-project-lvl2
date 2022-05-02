import path from "path";
import fs from "fs";
import gendiff from "../src/index.js";
import { parse } from "../src/parsers.js";
// import { dirname } from "path";

// const __dirname = dirname(__filename);
// const __filename = path.resolve(__dirname, '..', 'bin', 'gendiff.js');
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test("gendiff flat file", () => {
    expect(gendiff("__tests__/__fixtures__/file1.json", "__tests__/__fixtures__/file2.json", "json")).toBe(
      parse(readFile("expected_01.txt"), "json"));
    expect(gendiff("__tests__/__fixtures__/file1.yaml", "__tests__/__fixtures__/file2.yaml", "yaml")).toBe(
        parse(readFile("expected_01.txt"), "yaml"));
    });

test("gendiff recursion", () => {
    expect(gendiff("__tests__/__fixtures__/file1_recursion.json", "__tests__/__fixtures__/file2_recursion.json", "json")).toBe(
      parse(readFile("expected_02.txt"), "json"));
    expect(gendiff("__tests__/__fixtures__/file1_recursion.yml", "__tests__/__fixtures__/file2_recursion.yml", "yaml")).toBe(
      parse(readFile("expected_02.txt"), "yaml"));
    });
