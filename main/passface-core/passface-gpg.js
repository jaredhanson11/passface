let path = require('path')
let os = require('os')
let { DECRYPT_GPG_ERROR_CODES } = require('./passface-constants')
let { spawnSync} = require('child_process')

module.exports.encrypt = function(to_encrypt, filepath, datastore) {
}

module.exports.decrypt = function(filepath, gpgPwd, datastore) {
    const isMac = true;
    // Get this next value from user settings
    gpg = 'gpg'
    // when on windows
    //gpg = 'C:\\Program Files (x86)\\GnuPG\\bin\\gpg.exe'
    return _decrypt(filepath, gpg, gpgPwd)
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
    const error = check_error(p1_decrypt.stderr.toString(), DECRYPT_GPG_ERROR_CODES)
    if (error) {
      return {decryptedPwd: null, error: error}
    } else {
      const decrypted = p1_decrypt.stdout.toString()
      return {decryptedPwd: decrypted, error: null}
    }
}

function check_error(stdErr, gpgErrs) {
  console.log(stdErr)
  const lines = stdErr.split(os.EOL)
  // could probably just search entire string not line by line
  for (var i in lines) {
    const line = lines[i]
    for (var err in gpgErrs) {
      var error = gpgErrs[err]
      if (line.includes(error.message)) {
        return error.code
      }
    }
  }
}

// _encrypt('hi', 'gpg', 'thisismypassword', ['jared_t_hanson@apple.com'])
// _decrypt('hi', 'gpg', 'Getrichord13!')
