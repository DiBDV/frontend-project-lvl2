import _ from "lodash";
import path from "path";
import { getFileContent } from "./get-file-content.js";
import { parse } from "./parsers.js";
import { stylishRenderDiff } from "./formatter/stylish.js";

export const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const result = {};
  for (const key of keys) {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      console.log("nested", data1[key], data2[key]);
       result[key] = {type: "nested", value: buildDiff(data1[key], data2[key])};
    } else if (!Object.hasOwn(data1, key)) {
      console.log("added", data2[key]);
      result[key] = {type: "added", value: data2[key]};
    } else if (!Object.hasOwn(data2, key)) {
      console.log("deleted", data1[key]);
      result[key] = {type: "deleted", value: data1[key]} ;
    } else if (!_.isEqual(data1[key], data2[key])) {
      console.log("changed", data1[key], data2[key]);
      result[key] = {type: "changed", value: [data1[key], data2[key]]};
    } else {
      console.log("unchanged", data1[key]);
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
  const result = stylishRenderDiff(diff, format);
  return result;
};

export default gendiff;
