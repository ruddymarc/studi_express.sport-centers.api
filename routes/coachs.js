const express = require('express')
const router = express.Router()
const {
  createCoach, readCoach, updateCoach, deleteCoach
} = require('../controllers/coachs')

/* GET coachs listing. */
router.get('/', readCoach)

/* POST create new coach. */
router.post('/', createCoach)

/* PUT update one coach. */
router.put('/:coachId', updateCoach)

/* DELETE delete one coach. */
router.delete('/:coachId', deleteCoach)

module.exports = router
