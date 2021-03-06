import _ from 'lodash';
import path from 'path';
import getFileContent from './get-file-content.js';
import parse from './parsers.js';
import renderFormat from './formatters/index.js';

export const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  return keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', value: buildDiff(data1[key], data2[key]) };
    } if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    } if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    } if (!_.isEqual(data1[key], data2[key])) {
      return { key, type: 'changed', value: [data1[key], data2[key]] };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
};

const gendiff = (filepath1, filepath2, format) => {
  const file1Content = getFileContent(filepath1);
  const file2Content = getFileContent(filepath2);

  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);
  const data1 = parse(file1Content, extension1.substring(1));
  const data2 = parse(file2Content, extension2.substring(1));

  const diff = buildDiff(data1, data2);
  const result = renderFormat(diff, format);

  return result;
};

export default gendiff;
