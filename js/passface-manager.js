const fs = require("fs")
const path = require("path")
const constants = require("./constants")

/**
 * Pass List loops through the $PASSWORD_STORE directory and finds all *.gpg files
 */
module.exports.pass_list = function pass_list(directory) {
   function read_files(err, files) {
      if (err) { console.error(err); return }
      files.forEach(file => {
         fs.stat(path.join(directory, file), (err, stats) => {
            if (stats.isDirectory()) {var isDir = true}
         })
      });
   }
   fs.readdir(constants.PASSWORD_STORE, read_files)
}

/**
 * Given a password path such that <path>.gpg exists, attempts to decrypts the file with the default GPG key.
 */
function pass_show() {}

/**
 * Encrypts the passfile contents using public keys found at <path>/.gpg-ids
 */
function pass_insert() {}