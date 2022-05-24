import stylishRenderDiff from './stylish.js';
import plainRenderDiff from './plain.js';

const renderFormat = (diff, formatName = 'stylish') => {
  if (formatName === 'plain') {
    return plainRenderDiff(diff);
  } if (formatName === 'stylish') {
    return stylishRenderDiff(diff);
  } if (formatName === 'json') {
    return JSON.stringify(diff, null, 2);
  }
  throw new Error(`Format: ${formatName} not supported`);
};

export default renderFormat;
