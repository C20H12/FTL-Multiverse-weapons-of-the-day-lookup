const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1325,
    height: 800,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: false,
        nodeIntegration: true,
        nodeIntegrationInWorker: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('mwindow.html')

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

