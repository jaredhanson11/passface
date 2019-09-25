
const { BrowserWindow } = require('electron')

const { ipcMain } = require('electron')
const path = require('path')

const { IPC_CONSTANTS } = require('../constants')
const passfaceManager = require('./passface-core/passface-manager')
const passfaceConstants = require('./passface-core/passface-constants')

module.exports.registerEvents = function registerEvents() {
    ipcMain.on(IPC_CONSTANTS.GET_PASS_LIST, getPassList)
    ipcMain.on(IPC_CONSTANTS.GET_PASSWORD, getPassword)
    ipcMain.on(IPC_CONSTANTS.OPEN_PASSWORD, openPassword)
    ipcMain.on(IPC_CONSTANTS.GET_PATH_OWNERS, getPassOwners)
    ipcMain.on(IPC_CONSTANTS.ENCRYPT_PASSWORD, encryptPassword)
}

function getPassList(event, _path) {
    if (_path == null) { _path = [] }
    _path = path.join(..._path)
    event.returnValue = passfaceManager.pass_list(_path)
}

function openPassword(event, _path) {
  let pwdWin
  pwdWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  _path = path.join(..._path)
  const _fp = path.join(passfaceConstants.RENDERER_BASE, 'password', 'index.html')
  pwdWin.loadFile(_fp, {query: {path: _path}})

  // Open the DevTools.
  pwdWin.webContents.openDevTools()

  // Emitted when the window is closed.
  pwdWin.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    pwdWin = null
  })
  pwdWin.once('ready-to-show', () => {
    pwdWin.show()
  })
}

function getPassword(event, _path, gpgPwd) {
    _path = path.join(..._path)
    event.returnValue = passfaceManager.pass_show(_path, gpgPwd)
}

function getPassOwners(event, _path) {
  if (_path == null) { _path = [] }
  event.returnValue = passfaceManager.pass_owners(path.join(..._path))
}

function encryptPassword(event, arg1, arg2) {
  console.log('ENCRYPTING PASSWORD PLACEHOLDER')
  event.returnValue = ''
}