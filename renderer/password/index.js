const { ipcRenderer } = require('electron')
let constants = require("../../constants")
const $ = require("jquery")
Handlebars.partials = Handlebars.templates

$(document).ready(function(event) { 
  renderPwd(false)
})

function renderPwd(editable) {
  const _fp = getPwdPath()
  if (_fp.trim().endsWith('.gpg')) {
    const decryptedPwd = ipcRenderer.sendSync(constants.IPC_CONSTANTS.GET_PASSWORD, [_fp])
    console.log(constants)
    console.log(decryptedPwd)
    var needsPassword = false
    if (decryptedPwd.error == constants.DECRYPT_GPG_ERROR_CODES.BAD_PK_PWD.code) {
      needsPassword = true
      alert('Invalid password, try again')
    }
    if (decryptedPwd.error == constants.DECRYPT_GPG_ERROR_CODES.NEED_PK_PWD.code) {
      needsPassword = true
    }
    console.log(needsPassword)
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
  console.log("SUBMIT")
    ipcRenderer.sendSync(constants.IPC_CONSTANTS.ENCRYPT_PASSWORD)
    renderPwd(false)
}

function eventListeners() {
  $('.edit.button').click(editPwd)
  $('.submit.button').click(submitNewPwd)
}

function getPwdPath() {
  const urlParams = new URLSearchParams(window.location.search)
  const _path = urlParams.get('path')
  return _path
}