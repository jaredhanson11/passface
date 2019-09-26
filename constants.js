const IPC_CONSTANTS = {
    // Define IPC channels
    GET_PASS_LIST: 'get-pass-list-synchronous',
    GET_PASSWORD: 'get-password-synchronous',
    OPEN_PASSWORD: 'open-password-asynchronous',
    GET_PATH_OWNERS: 'get-path-owners-synchronous',
    ENCRYPT_PASSWORD: 'encrypt-password-synchronous'
};

const error = (message, code) => {return {message: message, code: code}}

// GpgErrorCodes
const NEED_PK_PWD = error('NEED_PASSPHRASE', 'NEED_PK_PWD')
const BAD_PK_PWD  = error('ERROR pkdecrypt_failed', 'BAD_PK_PWD')
const DECRYPTION_FAILED = error('DECRYPTION_FAILED', 'DECRYPTION_FAILED')

const DECRYPT_GPG_ERROR_CODES = {
  NEED_PK_PWD,
  BAD_PK_PWD,
  DECRYPTION_FAILED
}

// Git Error Codes
const NO_REPO_EXISTS = error('No such file or directory', 'NO_REPO_EXISTS')
const NO_GIT_REPO = error('not a git repository', 'NO_GIT_REPO')

const GIT_ERROR_CODES = {
  NO_REPO_EXISTS,
  NO_GIT_REPO
}

module.exports = { 
    IPC_CONSTANTS,
    DECRYPT_GPG_ERROR_CODES,
    GIT_ERROR_CODES
}