const router = require('express').Router()
const TypesController = require('../controllers/TypesController')
const controller = new TypesController
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})
  
const upload = multer({ storage })

/* GET Types listing. */
router.get('/', controller.getAll)

router.post('/add', controller.addType)

router.get('/:id', controller.goToEdit)

router.put('/:id', controller.editType)

router.delete('/:id', controller.deleteType)

module.exports = router
