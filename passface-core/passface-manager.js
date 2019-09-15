const fs = require("fs")
const path = require("path")
const constants = require("../constants")
const models = require("./passface-models")

/**
 * Pass List loops through the $PASSWORD_STORE directory and finds all *.gpg files
 */
module.exports.pass_list = function pass_list(directory) {
   let dir = path.join(constants.PASSWORD_STORE, directory)
   var passwordEntries = []
   let files = fs.readdirSync(dir);
   files.forEach(file => {
      let stats = fs.statSync(path.join(dir, file))
      let passwordEntry = new models.PasswordEntry(file, dir, stats.isDirectory())
      passwordEntries.push(passwordEntry)
   })
   return passwordEntries
}

/**
 * Given a password path such that <path>.gpg exists, attempts to decrypts the file with the default GPG key.
 */
function pass_show() {}

/**
 * Encrypts the passfile contents using public keys found at <path>/.gpg-ids
 */
function pass_insert() {}