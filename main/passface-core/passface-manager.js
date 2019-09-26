const fs = require("fs")
const os = require('os')
const path = require("path")
const passfaceConstants = require("./passface-constants")
const models = require("./passface-models")
const passfaceGpg = require('./passface-gpg')
const passfaceGit = require('./passface-git')
const { dataStore }= require('./passface-datastore')

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
module.exports.pass_show = function pass_show(pathToFile, gpgPwd) {
   const filename = path.basename(pathToFile)
   const directory = path.dirname(pathToFile)
   pathToFile = path.join(passfaceConstants.PASSWORD_STORE, pathToFile)
   const {decryptedPwd, error} = passfaceGpg.decrypt(pathToFile, gpgPwd)
   return new models.DecyptedPasswordEntry(filename, directory, false, decryptedPwd, error)
}

module.exports.pass_owners = function pass_owners(pathToFile) {
   pathToFile = path.join('.', pathToFile)
   var ids = []
   _path = path.join(passfaceConstants.PASSWORD_STORE, pathToFile)

   let stats = fs.statSync(_path)
   if (!stats.isDirectory()) {
      _path = path.dirname(pathToFile)
   }

   var doContinue = true
   while (doContinue) {
      if (_path == passfaceConstants.PASSWORD_STORE) {
         doContinue = false
      }

      var gpgIdPath = path.join(_path, passfaceConstants.GPG_IDS_FILENAME)
      if (fs.existsSync(gpgIdPath) && fs.statSync(gpgIdPath).isFile()) {
         var ids = []
         var _ids = fs.readFileSync(gpgIdPath).toString().split(os.EOL)
         for (i in _ids) {
            const id = _ids[i]
            if (id.trim() != '') {
               ids.push(id)
            }
         }
         return ids
      } else {
         _path = path.dirname(_path)
      }
   }
   return []
}

module.exports.setup = function setup() {
   passfaceGpg.setup()
   passfaceGit.setup()
}

/**
 * Encrypts the passfile contents using public keys found at <path>/.gpg-ids
 */
function pass_insert() {}