const Store = require('electron-store')
const passfaceConstants = require('./passface-constants')

class DataStore extends Store {

    // String
    // The current user's GPG key UID aka the private key that can decrypt passwords
    userGpgKey = null
    userGpgKey_key = 'userGpgKey'

    // Array<String>
    // The known GPG keys aka the public keys that are already imported into GPG client
    publicKeys = []
    publicKeys_key = 'publicKeys'

    // String
    // The path to the GPG program installed on the current computer
    userGpgPath = null
    userGpgPath_key = "gpgPath"

    constructor(settings) {
        if (settings == null || typeof settings != 'object') { settings = {}}
        settings.name = passfaceConstants.DATA_STORE_FILE_NAME
        super(settings)
        this.refresh()
    }

    setUserGpgKey(gpgKey) {
        // gpgKey is the key's UID
        this.userGpgKey = gpgKey
        return this
    }

    addPublicKey(publicKeyId) {
        this.publicKeys = [ ...this.publicKeys, publicKeyId ]
        return this
    }

    setUserGpgPath(gpgPath) {
        this.userGpgPath = gpgPath
        return this
    }

    save() {
        this.set(this.userGpgKey_key, this.userGpgKey)
        this.set(this.publicKeys_key, this.publicKeys)
        this.set(this.userGpgPath_key, this.userGpgPath)
    }

    refresh() {
        this.userGpgKey = this.get(this.userGpgKey_key) || null
        this.publicKeys = this.get(this.publicKeys_key) || []
        this.userGpgPath = this.get(this.userGpgPath_key, this.userGpgPath) || null
    }
}

module.exports = DataStore