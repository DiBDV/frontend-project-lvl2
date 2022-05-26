import yaml from 'js-yaml';

const parse = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml' || 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`Format: ${format} not supported`);
  }
};

export default parse;
