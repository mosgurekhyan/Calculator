class PuritiesService {
  constructor (models) {
    this.models = models
  }
  
  async getAll () {
    const purities = await this.models.purities.find({})
    return purities
  }
  
  async addPure (body) {
    const pure = new this.models.purities({ ...body })
    await pure.save()
    return pure
  }
  
  async goToEdit (id) {
    const result = await this.models.purities.findById({ _id: id})
    return result
  }
  
  async editPure (id, body) {
    const result = await this.models.purities.updateOne({ _id: id }, { ...body })
    return result
  }
  
  async deletePure (id) {
    const result = await this.models.purities.deleteOne({ _id: id })
    return result
  }
}
    
module.exports = PuritiesService