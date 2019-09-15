let constants = require("../constants")
let passfaceManager = require("../passface-core/passface-manager")
Handlebars.partials = Handlebars.templates


document.addEventListener("DOMContentLoaded", function(event) { 
    let { passwordNames, directoryNames } = passfaceManager.pass_list(constants.PASSWORD_STORE)
    console.log(passwordNames.toString())
    passwordNames = ['test', 'test2']
    const passListHTML = Handlebars.templates["password_list"]({passwords: passwordNames})
    const passListEntryHTML = Handlebars.templates["password_list_entry"]({password: "TEST"})
    console.log(passListHTML)
    console.log(passListEntryHTML)
    document.getElementsByTagName("body").innerHTML = passListHTML
});