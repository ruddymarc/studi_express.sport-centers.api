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

/**
 * Add one slot
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const addSlot = async (req, res, next) => {
  // check required properties
  if (!req.body?.coachId || !req.body?.label || !req.body?.peopleLimit) {
    return next('coachId, label and peopleLimit is required !')
  }
  const { Coach, Slot } = req.app.get('models')
  const date = new Date(req.body?.date || null)
  // create new slot
  new Slot({
    date: date.toISOString().replace(/T/, ' ').replace(/\..+/, '')+".100",
    coach: req.body.coachId,
    ...req.body
  })
    .save()
    .then(({ _id, coach }) => {
      Coach
        .findByIdAndUpdate(coach, { $push: { slots: _id }})
        .then((result) => { res.json(result) })
        .catch((error) => { next(error) })
    })
    .catch((error) => { next(error) })
}

/**
 * Remove one slot
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const removeSlot = async (req, res, next) => {
  // check required properties
  if (!req.body?.coachId || !req.body?.slotId) {
    return next('coachId, slotId is required !')
  }
  const { coachId, slotId } = req.body
  const { Coach } = req.app.get('models')
  Coach
    .findByIdAndUpdate(coachId, { $pull: { slots: slotId }})
    .then((result) => { res.json(result) })
    .catch((error) => { next(error) })
}

module.exports = {
  createCoach, readCoach, updateCoach, deleteCoach,
  addSlot, removeSlot
}
