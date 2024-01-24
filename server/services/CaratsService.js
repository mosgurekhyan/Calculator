class CaratsService {
    constructor (models) {
      this.models = models
    }
    
    async getAll () {
      const carats = await this.models.carats.find({})
      return carats
    }
    
    async addCarat (body) {
      console.log("body:",body)
      const carat = new this.models.carats({ ...body })
      await carat.save()
      return carat
    }
    
    async goToEdit (id) {
      const result = await this.models.carats.findById({ _id: id})
      return result
    }
    
    async editCarat (id, body) {
      const result = await this.models.carats.updateOne({ _id: id }, { ...body })
      return result
    }
    
    async deleteCarat (id) {
      const result = await this.models.carats.deleteOne({ _id: id })
      return result
    }
}
    
module.exports = CaratsService