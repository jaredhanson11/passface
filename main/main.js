const { ipcMain } = require('electron')
const path = require('path')

const { IPC_CONSTANTS } = require('../constants')
const passfaceGpg = require('./passface-core/passface-gpg')
const passfaceManager = require('./passface-core/passface-manager')
const passfaceConstants = require('./passface-core/passface-constants')

module.exports.registerEvents = function registerEvents() {
    ipcMain.on(IPC_CONSTANTS.GET_PASS_LIST, getPassList)
    // IPC_CONSTANTS.GET_PASSWORD
    // IPC_CONSTANTS.ENCRYPT_PASSWORD
}

function getPassList(event, _path) {
    if (_path == null) { _path = [] }
    _path = path.join(..._path)
    event.returnValue = passfaceManager.pass_list(_path)
}

function getPassword(event, _path) {
    _path = path.join(..._path)
    event.returnValue = passfaceManager.pass_show(_path)
}

function encryptPassword(event, arg1, arg2) {}