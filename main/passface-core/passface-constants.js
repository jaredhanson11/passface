const path = require("path")
const os = require("os")

const PROJECT_BASE = path.join(__dirname)
const PASSWORD_STORE = path.join(os.homedir(), ".password-store")

// Name of file used to store passface user data
const DATA_STORE_FILE_NAME = 'passface-storage'

module.exports = { 
    PROJECT_BASE,
    PASSWORD_STORE,
    DATA_STORE_FILE_NAME
}