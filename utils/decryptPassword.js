const { SHA256, encBase64 } = require('crypto-js')

/**
 * Return token|false
 * @param {*} param0 
 * @param {*} password 
 * @returns 
 */
module.exports = ({ salt, hash, token }, password) => {
  const toCompareHash = SHA256(salt + password).toString(encBase64)
  
  return (hash == toCompareHash) ? token : false
}