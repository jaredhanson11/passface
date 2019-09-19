const { ipcRenderer } = require('electron')
let constants = require("../../constants")
const $ = require("jquery")
Handlebars.partials = Handlebars.templates

$(document).ready(function(event) { 
  renderPwd(false)
})

function renderPwd(editable) {
  const _fp = getPwdPath()
  console.log(_fp)
  if (_fp.trim().endsWith('.gpg')) {
    const decryptedPwd = ipcRenderer.sendSync(constants.IPC_CONSTANTS.GET_PASSWORD, [_fp])
    const passListHTML = Handlebars.templates["password"]({password: decryptedPwd, editable: editable})
    $("body").html(passListHTML)
    eventListeners()
  } else {
    alert("BAD FILE")
  }
}

function eventListeners() {
  $('.edit.button').click((event) => {renderPwd(true)})
}

function getPwdPath() {
  const urlParams = new URLSearchParams(window.location.search)
  const _path = urlParams.get('path')
  return _path
}