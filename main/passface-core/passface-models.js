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

class DecyptedPasswordEntry extends PasswordEntry {

   password

   constructor(name, path, isDirectory, password) {
      super(name, path, isDirectory)
      this.password = password
   }
}

 module.exports = { PasswordEntry, DecyptedPasswordEntry }