const decryptPassword = require('../utils/decryptPassword')

module.exports = (req, res, next) => {
  const { method, url } = req
  if (method !== 'POST' || url !== '/login') {
    return next()
  }
  // check required properties
  if (!req.body?._id || !req.body?.password) {
    return next('_id and password required !')
  }
  const { _id, password } = req.body
  const { User } = req.app.get('models')
  User
    .findById(_id)
    .then((user) => {
      if (decryptPassword(user, password)) {
        res.json({token: user.token})
      } else {
        next('Invalid credential !')
      }
    })
    .catch((error) => { next(error) })
}