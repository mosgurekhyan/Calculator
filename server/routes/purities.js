const router = require('express').Router()
const PuritiesController = require('../controllers/PuritiesController')
const controller = new PuritiesController

/* GET Purity listing. */
router.get('/', controller.getAll)

router.post('/add', controller.addPure)

router.get('/:id', controller.goToEdit)

router.put('/:id', controller.editPure)

router.delete('/:id', controller.deletePure)

module.exports = router
