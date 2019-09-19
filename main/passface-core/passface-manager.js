const fs = require("fs")
const path = require("path")
const passfaceConstants = require("./passface-constants")
const models = require("./passface-models")
const passfaceGpg = require('./passface-gpg')

/**
 * Pass List loops through the $PASSWORD_STORE directory and finds all *.gpg files
 */
module.exports.pass_list = function pass_list(directory) {
   let dir = path.join(passfaceConstants.PASSWORD_STORE, directory)
   var passwordEntries = []
   let files = fs.readdirSync(dir);
   files.forEach(file => {
      let stats = fs.statSync(path.join(dir, file))
      let passwordEntry = new models.PasswordEntry(file, directory, stats.isDirectory())
      passwordEntries.push(passwordEntry)
   })

   // If not the root of ~/.password-store directory, then add "../" directory
   if (directory == null || directory.trim() != ".") {
      let dotDot = new models.PasswordEntry('..', directory, true)
      passwordEntries = [dotDot, ...passwordEntries]
   }
   return passwordEntries
}

/**
 * Given a password path such that <path>.gpg exists, attempts to decrypts the file with the default GPG key.
 */
module.exports.pass_show = function pass_show(pathToFile) {
   const filename = path.basename(pathToFile)
   const directory = path.dirname(pathToFile)
   pathToFile = path.join(passfaceConstants.PASSWORD_STORE, pathToFile)
   const decryptedPwd = passfaceGpg.decrypt(pathToFile)
   return new models.DecyptedPasswordEntry(filename, directory, false, decryptedPwd)
}

/**
 * Encrypts the passfile contents using public keys found at <path>/.gpg-ids
 */
function pass_insert() {}