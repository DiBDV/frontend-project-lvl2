import yaml from 'js-yaml';

export const parse = (content, format) => {
    if (format === '.json') {
        return JSON.parse(content);
    } else if (format === '.yml' || format === '.yaml') {
        return yaml.safeLoad(content);
    }
    // throw new Error(`Format: ${format} not supported`);
};
