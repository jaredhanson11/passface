const { ipcRenderer } = require('electron')
let constants = require("../../constants")
const $ = require("jquery")
Handlebars.partials = Handlebars.templates

$(document).ready(function(event) { 
  const urlParams = new URLSearchParams(window.location.search);
  const _path = urlParams.get('path');
  getPwd(_path)
});

function getPwd(_fp) {
  console.log(_fp.trim())
  if (_fp.trim().endsWith('.gpg')) {
    const decryptedPwd = ipcRenderer.sendSync(constants.IPC_CONSTANTS.GET_PASSWORD, [_fp])
    const passListHTML = Handlebars.templates["password"]({password: decryptedPwd})
    $("body").html(passListHTML)
  } else {
    alert("BAD FILE")
  }

}