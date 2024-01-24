const router = require('express').Router()
const ColorsController = require('../controllers/ColorsController')
const controller = new ColorsController

/* GET Colors listing. */
router.get('/', controller.getAll)

router.post('/add', controller.addColor)

router.get('/:id', controller.goToEdit)

router.put('/:id', controller.editColor)

router.delete('/:id', controller.deleteColor)

module.exports = router
