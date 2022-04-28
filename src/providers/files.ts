import * as fs from 'fs';
import * as path from 'path';



export function getFiles(directory: string) {
    let files: string[] = [];
    fs.readdirSync(directory).forEach(file => {
        const absolute = path.join(directory, file);
        
        if (fs.statSync(absolute).isDirectory()) {
            getFiles(absolute).forEach((e) => files.push(e));
        } else {
            files.push(absolute);
        };
    });

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
