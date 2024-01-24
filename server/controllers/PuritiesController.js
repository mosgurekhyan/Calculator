class PuritiesController {
  async getAll (req, res) {
    try {
      const purities = await req.app.services.purities.getAll() 
      res.json({ purities })
    } catch (error) {
      res.status(500).json({ message: error.message }) 
    }
  }

  async addPure (req, res) {
    try {
      await req.app.services.purities.addPure(req.body)
      res.json({ message: 'Pure added'})
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async goToEdit (req, res) {
    const { id } = req.params
    try {
      const pure = await req.app.services.purities.goToEdit(id)
      res.json({ pure })
    } catch (error) {
      res.status(500).json({ message: error.message})
    }
  }

  async editPure (req, res) {
    const { id } = req.params
    try {
      await req.app.services.purities.editPure(id, req.body)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async deletePure (req, res) {
    const { id } = req.params
    try {
      await req.app.services.purities.deletePure(id)
      res.json({ message: 'pure succesfully deleted!'})
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
    
module.exports = PuritiesController