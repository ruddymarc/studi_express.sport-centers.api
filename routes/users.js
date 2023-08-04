const express = require('express')
const router = express.Router()
const {
  createUser, readUser, updateUser, deleteUser
} = require('../controllers/users')

/* GET users listing. */
router.get('/', readUser)

/* POST create new user. */
router.post('/', createUser)

/* PUT update one user. */
router.put('/:userId', updateUser)

/* DELETE delete one user. */
router.delete('/:userId', deleteUser)

module.exports = router
