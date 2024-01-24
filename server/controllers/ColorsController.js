class colorsController {
  async getAll (req, res) {
    try {
      const colors = await req.app.services.colors.getAll() 
      res.json({ colors })
    } catch (error) {
      res.status(500).json({ message: error.message }) 
    }
  }

  async addColor (req, res) {
    try {
      await req.app.services.colors.addColor(req.body)
      res.json({ message: 'Color added'})
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async goToEdit (req, res) {
    const { id } = req.params
    try {
      const color = await req.app.services.colors.goToEdit(id)
      res.json({ color })
    } catch (error) {
      res.status(500).json({ message: error.message})
    }
  }

  async editColor (req, res) {
    const { id } = req.params
    try {
      await req.app.services.colors.editColor(id, req.body)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async deleteColor (req, res) {
    const { id } = req.params
    try {
      await req.app.services.colors.deleteColor(id)
      res.json({ message: 'color succesfully deleted!'})
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
  
module.exports = colorsController