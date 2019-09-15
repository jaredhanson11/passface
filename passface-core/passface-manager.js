// @ts-check
const fs = require("fs")
const path = require("path")
const constants = require("../constants")

/**
 * Pass List loops through the $PASSWORD_STORE directory and finds all *.gpg files
 */
module.exports.pass_list = function pass_list(directory) {
   /** @type { Array<string> } */
   var passwordNames = []
   /** @type { Array<string> } */
   var directoryNames = []
   let files = fs.readdirSync(constants.PASSWORD_STORE);
   files.forEach(file => {
      fs.stat(path.join(directory, file), (err, stats) => {
         if (stats.isDirectory()) {directoryNames.push(file)}
         else {passwordNames.push(file)}
      })
   })
   return {directory, directoryNames, passwordNames}
}

/**
 * Given a password path such that <path>.gpg exists, attempts to decrypts the file with the default GPG key.
 */
function pass_show() {}

/**
 * Encrypts the passfile contents using public keys found at <path>/.gpg-ids
 */
function pass_insert() {}