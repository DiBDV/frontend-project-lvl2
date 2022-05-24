import _ from 'lodash';

const stringify = (currentValue) => {
  if (_.isObject(currentValue)) {
    return '[complex value]';
  }
  if (_.isString(currentValue)) {
    return `'${currentValue}'`;
  }
  return currentValue;
};

const plainRenderDiff = (tree, path = []) => tree
  .filter(({ type }) => type !== 'unchanged')
  .map(({ key, value, type }) => {
    const currentPath = [...path, key];
    const currentKey = currentPath.join('.');
    if (type === 'nested') {
      return plainRenderDiff(value, currentPath);
    }
    if (type === 'added') {
      return `Property '${currentKey}' was added with value: ${stringify(value)}`;
    }
    if (type === 'deleted') {
      return `Property '${currentKey}' was removed`;
    }
    if (type === 'changed') {
      return `Property '${currentKey}' was updated. From ${stringify(value[0])} to ${stringify(value[1])}`;
    }
    throw new Error(`Not expected type: ${type}`);
  })
  .join('\n');

export default plainRenderDiff;
