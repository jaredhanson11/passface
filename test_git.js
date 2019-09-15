var gpg = require('gpg')

gpg.callStreaming("./electron-builder.yml", "./test.gpg", ['--encrypt', '-r', 'jared_t_hanson@apple.com'], function(err, data) {console.log(err)})
// gpg --quick-generate-key --batch --pinentry-mode loopback --passphrase test test@gmail.com
// gpg --batch --decrypt --pinentry-mode loopback --passphrase test