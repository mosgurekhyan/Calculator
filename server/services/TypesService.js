const fs = require('fs')

class TypesService {
  constructor (models) {
    this.models = models
  }

  async getAll () {
    const types = await this.models.types.find({})
    return types
  }

  async addType (body) {
    // console.log('FILESERVICE:', file)
    const type = new this.models.types({
      ...body,
      // img: {
      //   data: fs.readFileSync('../uploads' + file.filename),
      //   contentType: file.mimetype
      // }
    })
    await type.save()
    return type
  }

  async goToEdit (id) {
    const result = await this.models.types.findById({ _id: id})
    return result
  }

  async editType (id, body) {
    const result = await this.models.types.updateOne({ _id: id }, { ...body })
    return result
  }

  async deleteType (id) {
    const result = await this.models.types.deleteOne({ _id: id })
    return result
  }
}

module.exports = TypesService