const IPC_CONSTANTS = {
    // Define IPC channels
    GET_PASS_LIST: 'get-pass-list-synchronous',
    GET_PASSWORD: 'get-password-synchronous',
    OPEN_PASSWORD: 'open-password-asynchronous',
    GET_PATH_OWNERS: 'get-path-owners-synchronous',
    ENCRYPT_PASSWORD: 'encrypt-password-synchronous'
};

// GpgErrorCodes
const NEED_PK_PWD = "NEED_PASSPHRASE"
const BAD_PK_PWD = "ERROR pkdecrypt_failed"
const DECRYPTION_FAILED = "DECRYPTION_FAILED"

const DECRYPT_GPG_ERROR_CODES = {
  NEED_PK_PWD,
  BAD_PK_PWD,
  DECRYPTION_FAILED
}

module.exports = { 
    IPC_CONSTANTS,
    DECRYPT_GPG_ERROR_CODES
}