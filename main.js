const path = require('path')
const {app, BrowserWindow} = require('electron')
const {is} = require('electron-util')
const unhandled = require('electron-unhandled')
const debug = require('electron-debug')
const contextMenu = require('electron-context-menu')
const Store = require('electron-store')
const {autoUpdater} = require('electron-updater')

unhandled()
debug()
contextMenu({
  showSaveImageAs: true,
})

const config = new Store({
  name: 'config',
})
config.set('version', app.getVersion())

if (is.development) {
  console.log(`The config store path: ${config.path}`)
}

// TODO change
const MINUTE = 1000 * 60
setInterval(() => {
  autoUpdater.checkForUpdatesAndNotify()
}, MINUTE)
autoUpdater.checkForUpdatesAndNotify()

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('index.html')
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
