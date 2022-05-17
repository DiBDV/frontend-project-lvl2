import _ from "lodash";

export const plainRenderDiff = (diff) => {
    const iter = (currentValue) => {
        if (!_.isObject(currentValue)) { 
          return `${currentValue}`;
        }
        const lines = Object
          .entries(currentValue)
          .flatMap(([key, val]) => {
            if(val.type === "nested") {
                return `Property '${key}' ${iter(val.value)}`; 
                //make sure depth is needed? join over .join //
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
            // return Object;
          });
        return[ 
          ...lines,
        ].join('\n');
      };
    
      return iter(diff, 1);
};
