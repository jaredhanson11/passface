let constants = require("../constants")
let passfaceManager = require("../passface-core/passface-manager")
let $ = require("jquery")
Handlebars.partials = Handlebars.templates

$(document).ready(function(event) { 
    renderPasswordList(".")
});

function renderPasswordList(_path) {
    let passwordEntries = passfaceManager.pass_list(_path)
    const passListHTML = Handlebars.templates["password_list"]({passwords: passwordEntries})
    $("body").html(passListHTML)
}