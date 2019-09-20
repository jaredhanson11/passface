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

class GpgErrors {
   // Error message -> error code (opposite of mapping in GpgErrorCodes object)
   errToCode

   constructor(errCodes) {
      this.errToCode = {}
      for (var errCode in errCodes) {
         const errMessage = errCodes[errCode]
         this.errToCode[errMessage] = errCode
      }
   }
}

 module.exports = { GpgErrors, PasswordEntry, DecyptedPasswordEntry }