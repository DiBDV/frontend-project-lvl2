import _ from "lodash";
import filepath from "path";

export const parse = (content) => {
  try {
    return JSON.parse(content);
  } catch (error) {
    console.log(error);
    throw new Error(`File ${filepath} not found`);
  }
};

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
    } else if (data1[key] !== data2[key]) {
      result[key] = {type: "changed", value: [data1[key], data2[key]]};
    } else {
      result[key] = {type: "unchanged", value: data1[key]};
    }
  }

  return result;
};

const spacesCount = 2;
const replacer = " ";

export const renderDiff = (diff, /*format*/) => {
    const iter = (currentValue, depth) => {
        if (!_.isObject(currentValue)) { 
          return `${currentValue}`;
        }
        const indentSize = depth * spacesCount;
        const currentIndent = replacer.repeat(indentSize);
        const bracketIndent = replacer.repeat(indentSize - spacesCount);
        const lines = Object
          .entries(currentValue)
          .flatMap(([key, val]) => {
            if(val.type === "changed") {
              return [
                `${currentIndent}- ${key}: ${val.value[0]}`,
                `${currentIndent}+ ${key}: ${val.value[1]}`
              ];
            }
            return `${currentIndent}${paintSign(val.type)} ${key}: ${iter(val.value, depth + 1)}`
          });
        return [
          '{',
          ...lines,
          `${bracketIndent}}`,
        ].join('\n');
      };
    
      return iter(diff, 1);
};

const paintSign = (type) => {
  switch (type) {
    case "added":
      return "+";
    case "deleted":
      return "-";
    case "changed":
      return "";
    case "unchanged":
      return " ";
    default:
      return "";
  }
};
// ################################# NB to DO ######################################################

// 1st - https://ru.hexlet.io/challenges/js_objects_operations_exercise
// 2nd - https://ru.hexlet.io/challenges/js_trees_stringify_exercise

// create parcer to call for both files and extra read function to read the files;
// path.resolve() - absolute path to the file
// и process.cwd() - to read current dir path. are Node.js modules (find !!)
// check "three" module.
// separete function to compare and draft the tree NB.
// find a way to make prettier work in VS code 