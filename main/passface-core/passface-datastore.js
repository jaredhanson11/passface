const Store = require('electron-store')
const passfaceConstants = require('./passface-constants')

// Currently doesn't save anything on disk because setup step is stateless
// Eventually, this should save setup steps done so that only new setup is to be done
//  AKA: shouldn't attempt to reimport all <base>/pub-keys/* each time the app is started

class DataStore extends Store {

    // String
    // The current user's GPG key UID aka the private key that can decrypt passwords
    gpgKey = null
    gpgKey_key = 'gpgKey'

    // Array<String>
    // The known GPG keys aka the public keys that are already imported into GPG client
    publicKeys = []
    publicKeys_key = 'publicKeys'

    // String
    // The path to the GPG program installed on the current computer
    gpgPath = null
    gpgPath_key = "gpgPath"

    // String
    gitPath = null
    gitPath_key = "gitPath"

    //String
    passwordStorePath = null
    passwordStorePath_key = 'passwordStorePath'

    constructor(settings) {
        if (settings == null || typeof settings != 'object') { settings = {}}
        settings.name = passfaceConstants.DATA_STORE_FILE_NAME
        super(settings)
        this.refresh()
    }

    setGpgKey(gpgKey) {
        // gpgKey is the key's UID
        this.gpgKey = gpgKey
        return this
    }

    addPublicKey(publicKeyId) {
        this.publicKeys = [ ...this.publicKeys, publicKeyId ]
        return this
    }

    setGpgPath(gpgPath) {
        this.gpgPath = gpgPath
        return this
    }

    setGitPath(gitPath) {
        this.gitPath = gitPath
        return this
    }

    setPasswordStorePath(passwordStorePath) {
        this.passwordStorePath = passwordStorePath
        return this
    }

    save() {
        this.set(this.gpgKey_key, this.gpgKey)
        this.set(this.publicKeys_key, this.publicKeys)
        this.set(this.gpgPath_key, this.gpgPath)
        this.set(this.gitPath_key, this.gitPath)
        this.set(this.passwordStorePath_key, this.passwordStorePath)
        return this
    }

    refresh() {
        this.gpgKey = this.get(this.gpgKey_key, this.gpgKey)
        this.publicKeys = this.get(this.publicKeys_key, this.publicKeys)
        this.gpgPath = this.get(this.gpgPath_key, this.gpgPath)
        this.gitPath = this.get(this.gitPath_key, this.gitPath)
        this.passwordStorePath = this.get(this.passwordStorePath_key, this.passwordStorePath)
        return this
    }
}

const dataStoreObject = new DataStore({name: 'passface-config'})
module.exports.dataStore = dataStoreObject