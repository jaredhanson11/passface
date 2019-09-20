const path = require("path")
const os = require("os")

const PROJECT_BASE = path.join(__dirname, '..', '..')
const RENDERER_BASE = path.join(PROJECT_BASE, 'renderer')
const MAIN_BASE = path.join(PROJECT_BASE, 'main')
const PASSWORD_STORE = path.join(os.homedir(), ".password-store")
const GPG_IDS_FILENAME = ".gpg-id"

// Name of file used to store passface user data
const DATA_STORE_FILE_NAME = 'passface-storage'

// GpgErrorCodes
NEED_PK_PWD = "NEED_PASSPHRASE",
BAD_PK_PWD = "ERROR pkdecrypt_failed"

const DecryptGpgErrorCodes = {
  NEED_PK_PWD,
  BAD_PK_PWD
}

module.exports = { 
    PROJECT_BASE,
    RENDERER_BASE,
    MAIN_BASE,
    PASSWORD_STORE,
    DATA_STORE_FILE_NAME,
    GPG_IDS_FILENAME,
    DecryptGpgErrorCodes
}