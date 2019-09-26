const path = require("path")
const os = require("os")
let { spawnSync} = require('child_process')

/** Does executableName live on the users PATH */
module.exports.findProgram = function(executableName) {
    var ret = {error: null, path: null}
    if (isWindows()) {
        let p1_where = spawnSync('where', [executableName])
        const programPath = String(p1_where.stdout).trim()
        if (p1_where.error) {
            ret.error = p1_where.error.code
        } else if (programPath == ''){
            ret.error = 'NOEXEC:' + String(executableName)
        } else {
            ret.path = programPath
        }
        return ret
    } else if (isMac()) {
        let p1_which = spawnSync('which', [executableName])
        const programPath = String(p1_where.stdout).trim()
        if (p1_which.error) {
            ret.error = p1_where.error.code
        } else if (programPath == ''){
            ret.error = 'NOEXEC:' + String(executableName)
        } else {
            ret.path = programPath
        }
        return ret
    }
}

function isWindows() {
    return os.platform() == 'win32'
}

function isMac() {
    return os.platform() == 'darwin'
}