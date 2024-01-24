const { Schema, model } = require('mongoose')

const PuritiesSchema = Schema({
  title: {
    type: String,
    required: true
  },
  percent: {
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

module.exports = model('purity', PuritiesSchema)