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
                return `Property '${key}' ${iter(val.value, depth + 1)}`; //make sure depth is needed? join over .join //
                }
            else if(val.type === "added") {
                    return `Property '${key}' was added with value: ${val.value}`;
                  }            
            else if(val.type === "deleted") {
                return `Property '${key}' was removed`;
            }
            else if(val.type === "changed") {
                return [
                  `Property '${key}' was updated. From '${val.value[0]}' to '${val.value[1]}'`,
                ];
            }
            return `${currentIndent}  ${key}: ${val.value}`;
          });
        return[ 
          ...lines,
          `${bracketIndent}`,
        ].join('\n');
      };
    
      return iter(diff, 1);
};
