import * as vscode from 'vscode';
import * as fs from 'fs';


export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('cistat', async () => {
		console.log('[+] Start');
		
      // Create and show panel
      const panel = vscode.window.createWebviewPanel(
        'cistat',
        'Cistat Statistics',
        vscode.ViewColumn.One,
        {}
      );

      // And set its HTML content from the file
      panel.webview.html = await generateHTML();
	  
    })
  );
}

async function generateHTML() {
	let html = '';
	let css = '';

	await fs.promises.readFile(__dirname + '/../src/webview/index.html', 'utf-8').then(data => html = data);
	await fs.promises.readFile(__dirname + '/../src/webview/index.css', 'utf-8').then(data => css = data);
	
	html = html.replace('<!--${index.css}-->', '<style>\n'+css+'</style>\n');

	return html;
}

	