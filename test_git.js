var gpg = require('gpg')

console.log('hello')
gpg.callStreaming("./electron-builder.yml", "./test.gpg", ['--encrypt', '-r', 'jared_t_hanson@apple.com'], function(err, data) {console.log(err)})