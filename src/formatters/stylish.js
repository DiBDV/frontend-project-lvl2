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
  const lines = Object.entries(currentValue)
    .map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 1)}`);

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
      .flatMap(({ key, value, type }) => {
        if (type === 'nested') {
          return `${currentIndent}  ${key}: ${iter(value, currentDepth)}`;
        }
        if (type === 'added') {
          return `${currentIndent}+ ${key}: ${stringify(value, currentDepth)}`;
        }
        if (type === 'deleted') {
          return `${currentIndent}- ${key}: ${stringify(value, currentDepth)}`;
        }
        if (type === 'changed') {
          return [
            `${currentIndent}- ${key}: ${stringify(value[0], currentDepth)}`,
            `${currentIndent}+ ${key}: ${stringify(value[1], currentDepth)}`,
          ];
        }
        return `${currentIndent}  ${key}: ${stringify(value, currentDepth)}`;
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
