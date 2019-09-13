const path = require("path")

const PROJECT_BASE = path.join(__dirname, "..")
const HTML_BASE = path.join(PROJECT_BASE, "html")
const JS_BASE = path.join(PROJECT_BASE, "js")


module.exports = { 
    htmlFile: filePath => path.join(HTML_BASE, filePath),
    jsFile: filePath => path.join(JS_BASE, filePath)
}
console.log(module.exports)