import _ from "lodash";
import path from "path";
import { getFileContent } from "./get-file-content.js";
import { parse } from "./parsers.js";
import { renderDiff } from "./formatter/stylish.js";

export const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const result = {};
  for (const key of keys) {
    if (!Object.hasOwn(data1, key)) {
      result[key] = {type: "added", value: data2[key]};
    } else if (!Object.hasOwn(data2, key)) {
      result[key] = {type: "deleted", value: data1[key]} ;
    } else if (!_.isEqual(data1[key], data2[key])) {
      result[key] = {type: "changed", value: [data1[key], data2[key]]};
    } else if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      result[key] = {type: "nested", value: /* тут должна быть рекурси*/ data1[key]};
    } else {
      result[key] = {type: "unchanged", value: data1[key]};
    } 
  }

  return result;
};

 const gendiff = (filepath1, filepath2, format) => {
  const file1Content = getFileContent(filepath1);
  const file2Content = getFileContent(filepath2);

  const data1 = parse(file1Content, path.extname(filepath1));
  const data2 = parse(file2Content, path.extname(filepath2));

  const diff = buildDiff(data1, data2);
  const result = renderDiff(diff, format);
  return result;
};

export default gendiff;

// ################################# NB to DO ######################################################

// 1st - https://ru.hexlet.io/challenges/js_objects_operations_exercise
// 2nd - https://ru.hexlet.io/challenges/js_trees_stringify_exercise

// create parcer to call for both files and extra read function to read the files;
// path.resolve() - absolute path to the file
// и process.cwd() - to read current dir path. are Node.js modules (find !!)
// check "three" module.
// separete function to compare and draft the tree NB.
// find a way to make prettier work in VS code 