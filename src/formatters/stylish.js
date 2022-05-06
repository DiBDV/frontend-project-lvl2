import _ from "lodash";

const spacesCount = 4;
const replacer = " ";
const offcet = 2;

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) { 
    return `${currentValue}`;
  }

  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');

};


export const stylishRenderDiff = (diff) => {
    const iter = (currentValue, depth) => {
        const indentSize = depth * spacesCount;
        const currentIndent = replacer.repeat(indentSize - offcet);
        const bracketIndent = replacer.repeat(indentSize - spacesCount);
        const currentDepth = depth + 1;
        const lines = Object
          .entries(currentValue)
          .flatMap(([key, val]) => {
            if(val.type === "nested") {
                return `${currentIndent}  ${key}: ${iter(val.value, currentDepth)}`;
                }
            else if(val.type === "added") {
                    return `${currentIndent}+ ${key}: ${stringify(val.value, currentDepth)}`;
                  }            
            else if(val.type === "deleted") {
                return `${currentIndent}- ${key}: ${stringify(val.value, currentDepth)}`;
            }
            else if(val.type === "changed") {
                return [
                  `${currentIndent}- ${key}: ${stringify(val.value[0], currentDepth)}`,
                  `${currentIndent}+ ${key}: ${stringify(val.value[1], currentDepth)}`
                ];
            }
            return `${currentIndent}  ${key}: ${stringify(val.value, currentDepth)}`;
          });
        return [
          '{',
          ...lines,
          `${bracketIndent}}`,
        ].join('\n');
      };
    
      return iter(diff, 1);
};
