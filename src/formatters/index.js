import stylishRenderDiff from './stylish.js';
import plainRenderDiff from './plain.js';

const renderFormat = (diff, formatName = 'stylish') => {
  switch (formatName) {
    case 'plain':
      return plainRenderDiff(diff);
    case 'stylish':
      return stylishRenderDiff(diff);
    case 'json':
      return JSON.stringify(diff, null, 2);
    default:
      throw new Error(`Format: ${formatName} not supported`);
  }
};

export default renderFormat;
