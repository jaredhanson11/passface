const path = require("path")
const os = require("os")

const PROJECT_BASE = path.join(__dirname)
const PASSWORD_STORE = path.join(os.homedir(), ".password-store")

module.exports = { 
    PROJECT_BASE,
    PASSWORD_STORE
}