const vscode = acquireVsCodeApi();

vscode.postMessage('Message');
window.addEventListener('message', event => {
    const data = event.data;
    if (data.update) {
        for (let i = 0;i < data.payloads.length; i++) {
            const element = document.getElementById(data.payloads[i].id);
            if (element !== null) {
                element.innerHTML = data.payloads[i].innerHTML;
            } else {
                vscode.postMessage({'error': true, data: `ID "${data.payloads[i].id}" does not exist!`});
            }
        }
    }
});