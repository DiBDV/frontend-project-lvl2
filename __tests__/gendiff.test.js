import gendiff from "../src/index.js";

test("gendiff", () => {
    expect(gendiff("__tests__/__fixtures__/file1.json", "__tests__/__fixtures__/file2.json", "json")).toBe(
        `{
            - follow: false
              host: hexlet.io
            - proxy: 123.234.53.22
            - timeout: 50
            + timeout: 20
            + verbose: true
        }`);
    expect(gendiff("__tests__/__fixtures__/file1.yaml", "__tests__/__fixtures__/file2.yaml", "yaml")).toBe(
        `{
            - follow: false
              host: hexlet.io
            - proxy: 123.234.53.22
            - timeout: 50
            + timeout: 20
            + verbose: true
          }`);
        });
