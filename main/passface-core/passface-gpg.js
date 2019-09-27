let path = require('path')
let fs = require('fs')
let os = require('os')
let { DECRYPT_GPG_ERROR_CODES, PUB_KEYS_FOLDER_NAME } = require('./passface-constants')
let { dataStore } = require('./passface-datastore')
let { spawnSync} = require('child_process')
let passfaceUtilities = require('./passface-utilities')

module.exports.encrypt = function(to_encrypt, filepath) {
}

module.exports.decrypt = function(filepath, gpgPwd) {
    const isMac = true;
    // Get this next value from user settings
    // when on windows
    //gpg = 'C:\\Program Files (x86)\\GnuPG\\bin\\gpg.exe'
    return _decrypt(filepath, dataStore.gpgPath, gpgPwd)
}

module.exports.setup = function() {
  const findProgram = passfaceUtilities.findProgram('gpg')
  if (findProgram.error) {
    alert('DOWNLOAD GPG AND DON\'t MOVE FORWARD')
  } else {
    dataStore.setGpgPath(findProgram.path).save()
  }
  _importPubKeys()
}

function _encrypt(outputPath, gpgPath, toEncrypt, gpgIds) {
    pubKeys = gpgIds.map(id =>  '-r ' + id)
    // maybe need --with-colons
    var p1_input = spawnSync('echo', [toEncrypt])
    encrypt_args = ['--batch', '--status-fd', '2', '--encrypt',  ...pubKeys,  '-o', outputPath + '.gpg']
    var p2_encrypt = spawnSync(gpgPath, encrypt_args, {input: p1_input.stdout})
    // CHECK STDERR FOR STATUS OF COMMAND
}

function _decrypt(inputPath, gpgPath, gpgPwd) {
    var passphrase_options = []
    if (gpgPwd != null) {
        passphrase_options = ['--passphrase', gpgPwd]
    }
    // maybe need --with-colons
    decrypt_args = ['--batch', '--status-fd', '2', '--pinentry-mode', 'loopback',  ...passphrase_options, '--decrypt', inputPath]
    p1_decrypt = spawnSync(gpgPath, decrypt_args)
    // CHECK STDERR FOR STATUS OF COMMAND
    const error = passfaceUtilities.checkError(p1_decrypt.stderr, DECRYPT_GPG_ERROR_CODES)
    if (error) {
      return {decryptedPwd: null, error: error}
    } else {
      const decrypted = p1_decrypt.stdout.toString()
      return {decryptedPwd: decrypted, error: null}
    }
}

function _importPubKeys() {
  const pubKeysPath = path.join(dataStore.passwordStorePath, PUB_KEYS_FOLDER_NAME)
  console.log(pubKeysPath)
  const files = fs.readdirSync(pubKeysPath)
  for (i in files) {
    const file = files[i]
    console.log(file)
  }
}

// _encrypt('hi', 'gpg', 'thisismypassword', ['jared_t_hanson@apple.com'])
// _decrypt('hi', 'gpg', 'Getrichord13!')
