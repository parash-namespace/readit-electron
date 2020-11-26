// Modules
const {app, BrowserWindow, ipcMain} = require('electron')
const stateKeeper = require('electron-window-state')
const readItem = require('./readItem')
var path = require('path')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

ipcMain.on('new-item', (e, url) => {
  readItem( url, item => {
    e.sender.send('new-item-response', item)
  })
})

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  let state = stateKeeper({
    defaultWidth: 500,
    defaultHeight: 650
  })

  mainWindow = new BrowserWindow({
    x: state.x, y: state.y,
    width: state.width, height: state.height,
    minWidth: 400, maxWidth:650,
    minHeight: 300,
    backgroundColor: 'lightgray',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('renderer/main.html')

  state.manage(mainWindow)

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
