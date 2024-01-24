const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const models = require('./models')
const services = require('./services')

const typesRouter = require('./routes/types')
const colorsRouter = require('./routes/colors')
const puritiesRouter = require('./routes/purities')
const caratsRouter = require('./routes/carats')
const dataRouter = require('./routes/data')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('uploads'))

app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: 'GET, PUT, POST, DELETE',
    credentials: true
  })
)

app.use('/types', typesRouter)
app.use('/colors', colorsRouter)
app.use('/purities', puritiesRouter)
app.use('/carats', caratsRouter)
app.use('/data', dataRouter)

app.models = {
  types: models.types,
  colors: models.colors,
  purities: models.purities,
  carats: models.carats
}

app.services = {
  types: new (services.typesService) (app.models),
  colors: new (services.colorsService) (app.models),
  purities: new (services.puritiesService) (app.models),
  carats: new (services.caratsService) (app.models)
}

mongoose.connect(
  process.env.MONGOOSE_URL
).then(() => console.log('Db connected!')).catch(err => console.log(err))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app