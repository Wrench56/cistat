import * as fs from 'fs';
import * as path from 'path';



export function getFiles(directory: string) {
    let files: string[] = [];
    fs.readdirSync(directory).forEach(file => {
        console.log(file);
        if (!['img', 'bin', 'jpg', 'jpeg', 'png', 'exe', 'apk', 'pyc'].includes(file.split('.')[file.split(',').length-1])) {
            const absolute = path.join(directory, file);
            
            if (fs.statSync(absolute).isDirectory()) {
                getFiles(absolute).forEach((e) => files.push(e));
            } else {
                files.push(absolute);
            };
        }
    });
    // filter out images etc
    console.log(files.length);

    files = files.filter(o => !['img', 'bin', 'jpg', 'jpeg', 'png', 'exe', 'apk', 'pyc'].includes(o.split('.')[o.split(',').length-1]));
    console.log(files.length);
    return files;
}

async function readFile(file: string) {
    return await fs.promises.readFile(file).then(data => {
        return data.toString();
    });
}


export async function getFileContent(directory: string | false) {
    if (directory === false) {
        return false;
    }

    let content = new Map<string, string>();
    const fileNames = getFiles(directory);

    for (let i = 0; i < fileNames.length; i++) {
        content.set(fileNames[i], (await readFile(fileNames[i])));
    }

    return content;
}
