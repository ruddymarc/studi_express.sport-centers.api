const express = require('express')
const router = express.Router()
const {
  createCoach, readCoach, updateCoach, deleteCoach,
  addSlot, removeSlot
} = require('../controllers/coachs')

/* GET coachs listing. */
router.get('/', readCoach)

/* POST create new coach. */
router.post('/', createCoach)

/* PUT update one coach. */
router.put('/:coachId', updateCoach)

/* DELETE delete one coach. */
router.delete('/:coachId', deleteCoach)

/* PUT add slot. */
router.put('/slot/add', addSlot)

/* PUT remove slot. */
router.put('/slot/remove', removeSlot)

module.exports = router
