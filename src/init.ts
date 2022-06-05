import { getFileContent} from './providers/files';
import { getWorkingDir, generateHTML } from './utils';
import { parse } from 'node-html-parser';
import * as lines from './functions/lines';
import * as vscode from 'vscode';

export async function init(panel: vscode.WebviewPanel) {
    console.log('[+] Init');
    const html = parse(await generateHTML()); // parse to use the .getElementById etc.
    
    let dir = getWorkingDir();
    if (dir === false) {
        // Not yet supported...
        html.getElementById('status')!.innerHTML = 'This VSCode window did not open a project!';
        return html.toString();
    }

    getFileContent(dir).then(content => {
        saveFileEvents(content, panel);
    });

    vscode.workspace.onDidSaveTextDocument((document) => {
        dir = getWorkingDir();
        getFileContent(dir).then(content => {
            saveFileEvents(content, panel);
        });
    });


    return html.toString(); // vscode needs a string
}

function saveFileEvents(content: Map<string, string> | false, panel: vscode.WebviewPanel) {
    if (content !== false) {
        lines.handler(content, panel);
    }
}