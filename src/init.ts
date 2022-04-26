import { getLines } from './functions/get_lines';
import { getWorkingDir, generateHTML } from './utils';
import { parse } from 'node-html-parser';

export async function init() {
    const html = parse(await generateHTML()); // parse to use the .getElementById etc.

    const dir = getWorkingDir();
    if (dir === false) {
        // Not yet supported...
        html.getElementById('status')!.innerHTML = 'This VSCode window did not open a project!';
    } else {
        html.getElementById('status')!.innerHTML = 'Success!';
    }

    getLines();


    return html.toString(); // vscode need a string
}