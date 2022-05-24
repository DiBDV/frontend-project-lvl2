import _ from 'lodash';

const spacesCount = 4;
const replacer = ' ';
const offcet = 2;

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }

  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  const lines = currentValue
    .map(({ key, value }) => `${currentIndent}${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylishRenderDiff = (diff) => {
  const iter = (currentValue, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize - offcet);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const currentDepth = depth + 1;
    const lines = currentValue
      .map(({ key, value }) => {
        if (value.type === 'nested') {
          return `${currentIndent}  ${key}: ${iter(value.value, currentDepth)}`;
        }
        if (value.type === 'added') {
          return `${currentIndent}+ ${key}: ${stringify(value.value, currentDepth)}`;
        }
        if (value.type === 'deleted') {
          return `${currentIndent}- ${key}: ${stringify(value.value, currentDepth)}`;
        }
        if (value.type === 'changed') {
          return [
            `${currentIndent}- ${key}: ${stringify(value.value[0], currentDepth)}`,
            `${currentIndent}+ ${key}: ${stringify(value.value[1], currentDepth)}`,
          ];
        }
        return `${currentIndent}  ${key}: ${stringify(value.value, currentDepth)}`;
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};

export default stylishRenderDiff;
