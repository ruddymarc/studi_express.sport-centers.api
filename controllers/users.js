const encryptPassword = require('../utils/encryptPassword')

/**
 * Create new user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createUser = async (req, res, next) => {
  // check required properties
  if (!req.body?.password) {
    return next('Password required !')
  }
  const { User } = req.app.get('models')
  // create new user with encryted password
  new User({
    ...encryptPassword(req.body.password),
    ...req.body
  })
    .save()
    .then((user) => { res.json(user) })
    .catch((error) => { next(error) })
}

/**
 * Listing users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const readUser = async (req, res, next) => {
  const { User } = req.app.get('models')

  User
    .find({ ...req.query })
    .then((users) => { res.json(users) })
    .catch((error) => { next(error) })
}

/**
 * Update one user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateUser = async (req, res, next) => {
  const { User } = req.app.get('models')

  User
    .findByIdAndUpdate(req.params.userId, req.body)
    .then((user) => { res.json(user) })
    .catch((error) => { next(error) })
}

/**
 * Delete one user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteUser = async (req, res, next) => {
  const { User } = req.app.get('models')

  User
    .findByIdAndDelete(req.params.userId)
    .then((user) => { res.json(user) })
    .catch((error) => { next(error) })

}

module.exports = {
  createUser, readUser, updateUser, deleteUser
}