import _ from "lodash";

const spacesCount = 2;
const replacer = " ";

export const plainRenderDiff = (diff) => {
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
            if(val.type === "nested") {
                return `${currentIndent}  ${key}: ${iter(val.value, depth + 1)}`;
                }
            else if(val.type === "added") {
                    return `was added with value: ${val.value}`;
                  }            
            else if(val.type === "deleted") {
                return `${currentIndent}- ${key}: ${val.value}`;
            }
            else if(val.type === "changed") {
                return [
                  `${currentIndent}- ${key}: ${val.value[0]}`,
                  `${currentIndent}+ ${key}: ${val.value[1]}`
                ];
            }
            return `${currentIndent}  ${key}: ${val.value}`;
          });
        return [
          'Property',
          ...lines,
          `${bracketIndent}}`,
        ].join('\n');
      };
    
      return iter(diff, 1);
};
