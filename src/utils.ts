import * as vscode from 'vscode';
import * as fs from 'fs';

export function getWorkingDir() : string | false {
    const folder = vscode.workspace.workspaceFolders;

    if (folder !== undefined) {
        return folder[0].uri.fsPath;
    }

    return false;
}

export async function generateHTML() {
	let html = '';
	let css = '';
    let js = '';

	await fs.promises.readFile(__dirname + '/../src/webview/index.html', 'utf-8').then(data => html = data);
	await fs.promises.readFile(__dirname + '/../src/webview/index.css', 'utf-8').then(data => css = data);
    await fs.promises.readFile(__dirname + '/../src/webview/index.js', 'utf-8').then(data => js = data);
	
	html = html.replace('<!--${index.css}-->', '<style>\n'+css+'</style>\n');
    html = html.replace('<!--${index.js}-->', '<script>\n'+js+'</script>\n');

    return html;
}
