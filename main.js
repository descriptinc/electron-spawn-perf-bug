const {app, BrowserWindow, ipcMain} = require('electron')
const {spawnTest} = require('./spawn-test');

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    spawnTest(console.log);
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit();
})
