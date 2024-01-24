class TypesController {
  async getAll (req, res) {
    try {
      const types = await req.app.services.types.getAll() 
      res.json({ types })
    } catch (error) {
      res.status(500).json({ message: error.message }) 
    }
  }

  async addType (req, res) {
    // console.log('Uploaded File:', req.file);
    try {
      await req.app.services.types.addType(req.body)
      res.json({ message: 'Type added'})
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async goToEdit (req, res) {
    const { id } = req.params
    try {
      const type = await req.app.services.types.goToEdit(id)
      res.json({ type })
    } catch (error) {
      res.status(500).json({ message: error.message})
    }
  }

  async editType (req, res) {
    const { id } = req.params
    try {
      await req.app.services.types.editType(id, req.body)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async deleteType (req, res) {
    const { id } = req.params
    try {
      await req.app.services.types.deleteType(id)
      res.json({ message: 'type succesfully deleted!'})
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = TypesController