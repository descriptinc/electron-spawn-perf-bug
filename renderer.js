// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const remoteChildProcess = require('electron').remote.require('child_process');
const childProcess = require('child_process');
const {spawnTest} = require('./spawn-test')

const element = document.getElementById('output');
spawnTest(remoteChildProcess, (message) => {
    element.textContent += `REMOTE child_process: ${message}\n`;
});
spawnTest(childProcess, (message) => {
    element.textContent += `LOCAL child_process: ${message}\n`;
});
