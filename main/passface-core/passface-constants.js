const path = require("path")
const os = require("os")
const { DECRYPT_GPG_ERROR_CODES, GIT_ERROR_CODES } = require('../../constants')

const PROJECT_BASE = path.join(__dirname, '..', '..')
const RENDERER_BASE = path.join(PROJECT_BASE, 'renderer')
const MAIN_BASE = path.join(PROJECT_BASE, 'main')
const DEFAULT_PASSWORD_STORE = path.join(os.homedir(), ".password-store")
const GPG_IDS_FILENAME = ".gpg-id"

// Name of file used to store passface user data
const DATA_STORE_FILE_NAME = 'passface-storage'

module.exports = { 
    PROJECT_BASE,
    RENDERER_BASE,
    MAIN_BASE,
    DEFAULT_PASSWORD_STORE,
    DATA_STORE_FILE_NAME,
    GPG_IDS_FILENAME,
    DECRYPT_GPG_ERROR_CODES,
    GIT_ERROR_CODES
}