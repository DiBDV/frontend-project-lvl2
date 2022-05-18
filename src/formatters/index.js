import { stylishRenderDiff } from './stylish.js';
import { plainRenderDiff } from './plain.js';

export const renderFormat = (diff, formatName = 'stylish') => {
    if (formatName === 'plain') {
        return plainRenderDiff(diff, formatName);
    } if (formatName === 'stylish') {
        return stylishRenderDiff(diff, formatName);
    } if (formatName === 'json') {
        return JSON.stringify(diff, null, 2);
    }
    throw new Error(`Format: ${formatName} not supported`);
};

