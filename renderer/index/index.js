const { ipcRenderer } = require('electron')
let constants = require("../../constants")
const $ = require("jquery")
Handlebars.partials = Handlebars.templates

$(document).ready(function(event) { 
    renderPasswordList()
});

function renderPasswordList(_path) {
    let passwordEntries = ipcRenderer.sendSync(constants.IPC_CONSTANTS.GET_PASS_LIST, _path)
    const passListHTML = Handlebars.templates["password_list"]({passwords: passwordEntries})
    $("body").html(passListHTML)
    enableNavigation()
}

function enableNavigation() {
    $('.password-entry.directory').click((event) => {
        renderPasswordList($(event.target).data("path"))
    })

}