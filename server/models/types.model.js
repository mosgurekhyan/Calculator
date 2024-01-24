const { Schema, model } = require('mongoose')

const TypesSchema = Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  img: {
    // data: Buffer,
    // contentType: String
    type: String,
    required: true
  }
})

module.exports = model('type', TypesSchema)