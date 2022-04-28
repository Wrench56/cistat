import * as vscode from 'vscode';

export function handler(content: Map<string, string>, panel: vscode.WebviewPanel) {

    const payload = {'update': true, 'payloads': [
        {'id':'all-lines', 'innerHTML': getAllLines(content).toString()}
    ]};
    console.log(payload);
    panel.webview.postMessage(payload);
}

function getAllLines(content: Map<string, string>) {
    let lines = 0;
    for (let [_, value] of content) {
        lines += value.split(/\r\n|\r|\n/).length;
    }

    return lines;
}