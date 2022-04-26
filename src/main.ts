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
        {
          enableScripts: true,
        }
      );

      panel.webview.html = await generateHTML();

      if (panel.active) {
        panel.webview.postMessage({'update': true, 'payload': {'id':'label', 'innerHTML': 'I <3 coding'}});
      }
      panel.webview.onDidReceiveMessage((data) => {
        console.log(data);
      },
      undefined,
      context.subscriptions);
	  
    })
  );
}

async function generateHTML() {
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

	