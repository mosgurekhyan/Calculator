const { Schema, model } = require('mongoose')

const CaratsSchema = Schema({
  percent: {
    type: Number, 
    required: true
  }
})

module.exports = model('carat', CaratsSchema)