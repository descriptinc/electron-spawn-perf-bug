// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {spawn} = require('child_process');
const {spawnTest} = require('./spawn-test')

const element = document.getElementById('output');
spawnTest((message) => {
    element.textContent += `${message}\n`;
});
