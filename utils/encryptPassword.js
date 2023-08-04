const uid2 = require('uid2')
const { SHA256, encBase64 } = require('crypto-js')

/**
 * Return password encoded
 * @param {*} password 
 * @returns 
 */
module.exports = (password) => {
  const token = uid2(16)
  const salt = uid2(16)
  const hash = SHA256(salt + password).toString(encBase64)

  return { token, salt, hash }
}