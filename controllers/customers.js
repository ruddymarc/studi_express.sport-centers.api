const encryptPassword = require('../utils/encryptPassword')

/**
 * Create new customer
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createCustomer = async (req, res, next) => {
  // check required properties
  if (!req.body?.password) {
    return next('Password required !')
  }
  const { User, Customer } = req.app.get('models')
  // create new user with encryted password
  new User({
    ...encryptPassword(req.body.password),
    ...req.body
  })
    .save()
    .then(({ _id }) => {
      // create customer based on user
      new Customer({ _id, user: _id })
      .save()
      .then((customer) => { res.json(customer) })
      .catch((error) => { next(error) })
    })
    .catch((error) => { next(error) })
}

/**
 * Listing customers
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const readCustomer = async (req, res, next) => {
  const { Customer } = req.app.get('models')

  Customer
    .find({ ...req.query })
    .populate('user')
    .populate('slots')
    .then((customers) => { res.json(customers) })
    .catch((error) => { next(error) })
}

/**
 * Update one customer
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateCustomer = async (req, res, next) => {
  const { Customer } = req.app.get('models')

  Customer
    .findByIdAndUpdate(req.params.customerId, req.body)
    .then((customer) => { res.json(customer) })
    .catch((error) => { next(error) })
}

/**
 * Delete one customer
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteCustomer = async (req, res, next) => {
  const { Customer } = req.app.get('models')

  Customer
    .findByIdAndDelete(req.params.customerId)
    .then((customer) => { res.json(customer) })
    .catch((error) => { next(error) })
}

/**
 * Add one subscribtion
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const addSubscribtion = async (req, res, next) => {
  // check required properties
  if (!req.body?.customerId || !req.body?.amountPaid) {
    return next('customerId and amountPaid is required !')
  }
  const { Customer, Subscribtion } = req.app.get('models')
  const { customerId, amountPaid } = req.body
  // find one customer
  Customer
    .findById(customerId, { subscribtions: true })
    .populate('subscribtions')
    .then((customer) => {
      // ensure subscribtion has concecutive
      const startAt = new Date(Math.max(
        Date.now(),
        ...customer.subscribtions.map(subscribtion => subscribtion.endAt.valueOf())
      ))
      const endAt = new Date(startAt)
      endAt.setMonth(startAt.getMonth() +1)
      // Save new subscribtion
      new Subscribtion({
        startAt: startAt.toISOString().replace(/T/, ' ').replace(/\..+/, '')+".100",
        endAt: endAt.toISOString().replace(/T/, ' ').replace(/\..+/, '')+".100",
        amountPaid
      })
        .save()
        .then((subscribtion) => {
          customer.subscribtions.push(subscribtion)
          customer.save()
          res.json(subscribtion)
        })
        .catch((error) => { next(error) })
    })
    .catch((error) => { next(error) })
}

/**
 * Remove one subscribtion
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const removeSubscribtion = async (req, res, next) => {
  // check required properties
  if (!req.body?.customerId || !req.body?.amountPaid) {
    return next('customerId and amountPaid is required !')
  }
  const { Customer } = req.app.get('models')
  const { customerId, subscribtionId } = req.body
  Customer
    .findByIdAndUpdate(customerId, { $pull: { subscribtions: subscribtionId }})
    .then((customer) => { res.json(customer) })
    .catch((error) => { next(error) })
}

/**
 * Booked slot
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const bookedSlot = async (req, res, next) => {
  // check required properties
  if (!req.body?.customerId || !req.body?.slotId) {
    return next('customerId and slotId is required !')
  }
  const { Customer, Slot } = req.app.get('models')
  const { customerId, slotId } = req.body

  // check already booked this slot
  Slot
    .findOne({ _id: slotId, customers: { $nin: [customerId]}})
    .then((slot) => {
      if (!slot) {
        next("You have already booked this slot!")
      }

      const { date, peopleLimit, customers } = slot
      // check people limit
      if (peopleLimit <= customers.length) {
        next("Slots booked have reached their limits!")
      }
      // search customer
      Customer
        .findById(customerId, { subscribtions: true, slots: true })
        .populate('subscribtions')
        .then((customer) => {
          // check valid subscribtion
          if (customer.subscribtions.map(subscribtion => subscribtion.endAt < date) === false) {
            next("Must be subscriber !")
          }
          // save booked
          slot.customers.push(customer)
          customer.slots.push(slot)
          slot.save()
          customer.save()

          res.json("booked slot successfully.")
        })
        .catch((error) => next(error))
    })
    .catch((error) => { next(error) })
}

/**
 * Unbooked slot
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const unbookedSlot = async (req, res, next) => {
  // check required properties
  if (!req.body?.customerId || !req.body?.slotId) {
    return next('customerId and slotId is required !')
  }
  const { Customer } = req.app.get('models')
  const { customerId, slotId } = req.body
  Customer
    .findByIdAndUpdate(customerId, { $pull: { slots: slotId }})
    .then((customer) => { res.json(customer) })
    .catch((error) => { next(error) })
}

module.exports = {
  createCustomer, readCustomer, updateCustomer, deleteCustomer,
  addSubscribtion, removeSubscribtion,
  bookedSlot, unbookedSlot
}
