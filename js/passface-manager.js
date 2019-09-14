

/**
 * Pass List loops through the $PASSWORD_STORE directory and finds all *.gpg files
 */
function pass_list(directory) {}

/**
 * Given a password path such that <path>.gpg exists, attempts to decrypts the file with the default GPG key.
 */
function pass_show() {}

/**
 * Encrypts the passfile contents using public keys found at <path>/.gpg-ids
 */
function pass_insert() {}