class ColorsService {
  constructor (models) {
    this.models = models
  }
  
  async getAll () {
    const colors = await this.models.colors.find({})
    return colors
  }
  
  async addColor (body) {
    console.log("body:",body)
    const color = new this.models.colors({ ...body })
    await color.save()
    return color
  }
  
  async goToEdit (id) {
    const result = await this.models.colors.findById({ _id: id})
    return result
  }
  
  async editColor (id, body) {
    const result = await this.models.colors.updateOne({ _id: id }, { ...body })
    return result
  }
  
  async deleteColor (id) {
    const result = await this.models.colors.deleteOne({ _id: id })
    return result
  }
}
  
module.exports = ColorsService