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
        const programPath = String(p1_which.stdout).trim()
        if (p1_which.error) {
            ret.error = p1_which.error.code
        } else if (programPath == ''){
            ret.error = 'NOEXEC:' + String(executableName)
        } else {
            ret.path = programPath
        }
        return ret
    }
}

module.exports.checkError = function(output, errs) {
  const EMPTY_OR_NULL_ERR = "EMPTY_OR_NULL_OUTPUT"
  if (output) {
    const lines = String(output).split(os.EOL)
    // could probably just search entire string not line by line
    for (var i in lines) {
      const line = lines[i]
      for (var err in errs) {
        var error = errs[err]
        if (line.includes(error.message)) {
          return error.code
        }
      }
    }
  } else {
      return EMPTY_OR_NULL_ERR
  }
}

function isWindows() {
    return os.platform() == 'win32'
}

function isMac() {
    return os.platform() == 'darwin'
}