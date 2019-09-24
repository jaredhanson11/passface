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
   error

   constructor(name, path, isDirectory, password, error) {
      super(name, path, isDirectory)
      this.password = password
      this.error=error
   }
}
 module.exports = { PasswordEntry, DecyptedPasswordEntry }