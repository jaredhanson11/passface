let path = require('path')
let { spawnSync} = require('child_process')

module.exports.encrypt = function(to_encrypt, filepath, datastore) {
}

module.exports.decrypt = function(filepath, datastore) {
    const isMac = true;
    // Get this next value from user settings
    gpg = 'gpg'
    return _decrypt(filepath, gpg)
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
    console.log(decrypt_args)
    p1_decrypt = spawnSync(gpgPath, decrypt_args)
    // CHECK STDERR FOR STATUS OF COMMAND
    const decrypted = p1_decrypt.stdout.toString()
    console.log(p1_decrypt.stderr.toString())
    return decrypted
}

// _encrypt('hi', 'gpg', 'thisismypassword', ['jared_t_hanson@apple.com'])
// _decrypt('hi', 'gpg', 'Getrichord13!')
