const encryptPassword = require('../utils/encryptPassword')

/**
 * Create new coach
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createCoach = async (req, res, next) => {
  // check required properties
  if (!req.body?.password) {
    return next('Password required !')
  }
  const { User, Coach } = req.app.get('models')
  // create new user with encryted password
  new User({
    ...encryptPassword(req.body.password),
    ...req.body
  })
    .save()
    .then(({ _id }) => {
      // create coach based on user
      new Coach({ _id, user: _id })
      .save()
      .then((coach) => { res.json(coach) })
      .catch((error) => { next(error) })
    })
    .catch((error) => { next(error) })
}

/**
 * Listing coachs
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const readCoach = async (req, res, next) => {
  const { Coach } = req.app.get('models')

  Coach
    .find({ ...req.query })
    .populate('user')
    .populate('slots')
    .then((coachs) => { res.json(coachs) })
    .catch((error) => { next(error) })
}

/**
 * Update one coach
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateCoach = async (req, res, next) => {
  const { Coach } = req.app.get('models')

  Coach
    .findByIdAndUpdate(req.params.coachId, req.body)
    .then((coach) => { res.json(coach) })
    .catch((error) => { next(error) })
}

/**
 * Delete one coach
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteCoach = async (req, res, next) => {
  const { Coach } = req.app.get('models')

  Coach
    .findByIdAndDelete(req.params.coachId)
    .then((coach) => { res.json(coach) })
    .catch((error) => { next(error) })
}

module.exports = {
  createCoach, readCoach, updateCoach, deleteCoach
}
