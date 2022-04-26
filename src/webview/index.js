const vscode = acquireVsCodeApi();

vscode.postMessage('Message');
window.addEventListener('message', event => {
    const data = event.data;
    if (data.update) {
        const payload = data.payload;
        const element = document.getElementById(payload.id);
        if (element !== null) {
            element.innerHTML = payload.innerHTML;
        } else {
            vscode.postMessage({'error': true, data: `ID "${payload.id}" does not exist!`});
        }
    }
});