class PasswordEntry {
    name
    path
    isDirectory
 
    constructor(name, path, isDirectory) {
       this.name = name
       this.path = path
       this.isDirectory = isDirectory
    }
 }

 module.exports = {PasswordEntry}