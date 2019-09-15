let constants = require("../constants")
let passfaceManager = require("../passface-core/passface-manager")
Handlebars.partials = Handlebars.templates

document.addEventListener("DOMContentLoaded", function(event) { 
    renderPasswordList(".")
});

function renderPasswordList(_path) {
    let passwordEntries = passfaceManager.pass_list(_path)
    const passListHTML = Handlebars.templates["password_list"]({passwords: passwordEntries})
    document.getElementById("body").innerHTML = passListHTML
}