import gendiff from "../src/index.js";
import { parse } from "../src/parsers.js";

// function to get file content of result.txt
// it's called 'helper' function

// helper to resovle __fixtures__.

test("gendiff flat file", () => {
    expect(gendiff("__tests__/__fixtures__/file1.json", "__tests__/__fixtures__/file2.json", "json")).toBe(
      parse("__tests__/__fixtures__/expected_01.txt", "json"));
    expect(gendiff("__tests__/__fixtures__/file1.yaml", "__tests__/__fixtures__/file2.yaml", "yaml")).toBe(
        parse("__tests__/__fixtures__/expected_01.txt", "yaml"));
    });

test("gendiff recursion", () => {
    expect(gendiff("__tests__/__fixtures__/file1_recursion.json", "__tests__/__fixtures__/file2_recursion.json", "json")).toBe(
      parse("__tests__/__fixtures__/expected_02.txt", "json"));
    expect(gendiff("__tests__/__fixtures__/file1_recursion.yaml", "__tests__/__fixtures__/file2_recursion.yaml", "yaml")).toBe(
      parse("__tests__/__fixtures__/expected_02.txt", "yaml"));
    });
