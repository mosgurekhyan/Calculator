const router = require('express').Router()
const CaratController = require('../controllers/CaratController')
const controller = new CaratController

/* GET Colors listing. */
router.get('/', controller.getAll)

router.post('/add', controller.addCarat)

router.get('/:id', controller.goToEdit)

router.put('/:id', controller.editCarat)

router.delete('/:id', controller.deleteCarat)

module.exports = router
