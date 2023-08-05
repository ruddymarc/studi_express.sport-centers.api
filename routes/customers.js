const express = require('express')
const router = express.Router()
const {
  createCustomer, readCustomer, updateCustomer, deleteCustomer,
  addSubscribtion, removeSubscribtion,
  bookedSlot, unbookedSlot
} = require('../controllers/customers')

/* GET customers listing. */
router.get('/', readCustomer)

/* POST create new customer. */
router.post('/', createCustomer)

/* PUT update one customer. */
router.put('/:customerId', updateCustomer)

/* DELETE delete one customer. */
router.delete('/:customerId', deleteCustomer)

/* PUT add one subscribtion. */
router.put('/subscribtion/add', addSubscribtion)

/* PUT remove one subscribtion. */
router.put('/subscribtion/remove', removeSubscribtion)

/* PUT remove one subscribtion. */
router.put('/slot/booked', bookedSlot)

/* PUT remove one subscribtion. */
router.put('/slot/unbooked', unbookedSlot)

module.exports = router
