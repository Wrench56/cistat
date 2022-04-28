import * as vscode from 'vscode';

import { init } from './init';


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
      
      panel.webview.html = await init(panel);


      panel.webview.onDidReceiveMessage((data) => {
        console.log(data);
      },
      undefined,
      context.subscriptions);
	  
    })
  );
}
