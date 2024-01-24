class CaratController {
  async getAll (req, res) {
    try {
      const carats = await req.app.services.carats.getAll() 
      res.json({ carats })
    } catch (error) {
      res.status(500).json({ message: error.message }) 
    }
  }
    
  async addCarat(req, res) {
    try {
      await req.app.services.carats.addCarat(req.body)
      res.json({ message: 'Carat added'})
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
    
  async goToEdit (req, res) {
    const { id } = req.params
    try {
      const carat = await req.app.services.carats.goToEdit(id)
      res.json({ carat })
    } catch (error) {
      res.status(500).json({ message: error.message})
    }
  }
    
  async editCarat(req, res) {
    const { id } = req.params
    try {
      await req.app.services.carats.editCarat(id, req.body)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
    
  async deleteCarat(req, res) {
    const { id } = req.params
    try {
      await req.app.services.carats.deleteCarat(id)
      res.json({ message: 'Carat succesfully deleted!'})
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = CaratController