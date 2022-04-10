import * as fs from 'fs';
import { resolve } from 'path';

// Получаем путь к файлу. Не совсем понятно, работает или нет.
export const getFileContent = (filepath) => {
    try {
        return fs.readFileSync(resolve(filepath), 'utf8');
    } catch (error) {
        console.log(error);
        throw new Error(`File ${filepath} not found`);
    }
};




// const curDir = process.cwd();
// const filepath1 = path.resolve('../__tests__', 'file1.json')
// const filepath2 = path.resolve('../__tests__', 'file2.json')

// const file1 = JSON.parse(fs.readFileSync(filepath1), 'utf8');
// const file2 = JSON.parse(fs.readFileSync(filepath2), 'utf8');

