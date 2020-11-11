const {app, BrowserWindow, contentTracing} = require('electron')
const childProcess = require('child_process');
const {spawnTest} = require('./spawn-test');

let mainWindow;

app.allowRendererProcessReuse = true;
app.on('ready', async () => {
    await contentTracing.startRecording({
        include_categories: ['*']
    })
    console.log('Tracing started')

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            sandbox: false,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    spawnTest(childProcess, console.log);

    await new Promise(resolve => setTimeout(resolve, 5000))
    const path = await contentTracing.stopRecording()
    console.log('Tracing data recorded to ' + path)
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit();
})
