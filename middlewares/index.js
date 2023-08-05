const welcome = require('./welcome.middleware')
const login = require('./login.middleware')
const guard = require('./guard.middleware')

module.exports = {
  welcome, login, guard
}