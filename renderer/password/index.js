const { ipcRenderer } = require('electron')
let { dialog } = require('electron').remote
let constants = require("../../constants")
const $ = require("jquery")
Handlebars.partials = Handlebars.templates

$(document).ready(function(event) { 
  renderPwd(false)
})

function renderPwd(editable, pkPassphrase) {
  const _fp = getPwdPath()
  if (_fp.trim().endsWith('.gpg')) {
    const decryptedPwd = ipcRenderer.sendSync(constants.IPC_CONSTANTS.GET_PASSWORD, [_fp], pkPassphrase)
    var needsPassword = false
    if (decryptedPwd.error == constants.DECRYPT_GPG_ERROR_CODES.BAD_PK_PWD.code) {
      dialog.showMessageBox({message: 'Invalid password'});
      needsPassword = true
    }
    if (decryptedPwd.error == constants.DECRYPT_GPG_ERROR_CODES.NEED_PK_PWD.code) {
      needsPassword = true
    }
    const passListHTML = Handlebars.templates["password"]({password: decryptedPwd, editable: editable, needsPassword: needsPassword})
    $(".body").html(passListHTML)
    eventListeners()
  } else {
    alert("BAD FILE")
  }
}

function editPwd(event) {
  renderPwd(true)
}

function submitNewPwd(event) {
  ipcRenderer.sendSync(constants.IPC_CONSTANTS.ENCRYPT_PASSWORD)
  renderPwd(false)
}

function enterPrivKeyPassphrase(event) {
  const pkPassphrase = $('input#pk-passphrase').val()
  renderPwd(false, pkPassphrase)
}

function eventListeners() {
  $('.edit-pwd.button').click(editPwd)
  $('.new-pwd.button').click(submitNewPwd)
  $('.pk-passphrase.button').click(enterPrivKeyPassphrase)
}

function getPwdPath() {
  const urlParams = new URLSearchParams(window.location.search)
  const _path = urlParams.get('path')
  return _path
}