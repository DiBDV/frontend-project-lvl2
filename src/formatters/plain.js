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
    const lines = Object
      .entries(currentValue)
    // eslint-disable-next-line no-unused-vars
      .filter(([_, val]) => val.type !== 'unchanged')
      .map(([key, val]) => {
        const currentPath = [...path, key];
        const currentKey = currentPath.join('.');
        if (val.type === 'nested') {
          return iter(val.value, currentPath);
        }
        else if (val.type === 'added') {
          return `Property '${currentKey}' was added with value: ${stringify(val.value)}`;
        }            
        else if (val.type === 'deleted') {
          return `Property '${currentKey}' was removed`;
        }
        else if (val.type === 'changed') {
          return `Property '${currentKey}' was updated. From ${stringify(val.value[0])} to ${stringify(val.value[1])}`;
        }
        return ;
      });
    return[ 
      ...lines,
    ].join('\n');
  };
    
  return iter(diff, []);
};

export default plainRenderDiff;
