let path = require('path')
let { exec } = require('child_process')

module.exports.encrypt = function(to_encrypt, filepath, datastore) {
}

module.exports.decrypt = function(filepath, datastore) {
}

function _encrypt(outputPath, gpgPath, toEncrypt, gpgIds) {
    inputStream = '"' + toEncrypt + '"'
    pubKeys = gpgIds.map(id =>  '-r ' + id)
    // probably need --with-colons
    args = ['echo', inputStream, '|', gpgPath, '--batch', '--encrypt', ...pubKeys, '-o ' + outputPath + '.gpg']
}

function _decrypt(inputPath, gpgPath, gpgId, gpgPwd) {
    // probably need --with-colons
    args = [gpgPath, '--batch', '--decrypt', '--pinentry-mode loopback', '--passphrase', gpgPwd,]
    return //output of the gpg --decrypt call
}

// _encrypt('test/path/filename', 'gpg', 'thisismypassword', ['jared_t_Hanson@apple.com'])