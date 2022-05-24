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

const plainRenderDiff = (diff) => {
  const iter = (currentValue, path) => {
    const lines = currentValue
      .filter(({ type }) => type !== 'unchanged')
      .map(({ key, value }) => {
        const currentPath = [...path, key];
        const currentKey = currentPath.join('.');
        if (value.type === 'nested') {
          return iter(value.value, currentPath);
        }
        if (value.type === 'added') {
          return `Property '${currentKey}' was added with value: ${stringify(value.value)}`;
        }
        if (value.type === 'deleted') {
          return `Property '${currentKey}' was removed`;
        }
        if (value.type === 'changed') {
          return `Property '${currentKey}' was updated. From ${stringify(value.value[0])} to ${stringify(value.value[1])}`;
        }
        throw new Error(`Not expected type: ${value.type}`);
      });
    return [
      ...lines,
    ].join('\n');
  };

  return iter(diff, []);
};

export default plainRenderDiff;
