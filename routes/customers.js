const express = require('express')
const router = express.Router()
const {
  createCustomer, readCustomer, updateCustomer, deleteCustomer
} = require('../controllers/customers')

/* GET customers listing. */
router.get('/', readCustomer)

/* POST create new customer. */
router.post('/', createCustomer)

/* PUT update one customer. */
router.put('/:customerId', updateCustomer)

/* DELETE delete one customer. */
router.delete('/:customerId', deleteCustomer)

module.exports = router
