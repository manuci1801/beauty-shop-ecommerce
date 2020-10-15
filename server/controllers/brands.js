const Brand = require('../models/Brand')

/**
 * get all brands
 * @param {*} req 
 * @param {*} res 
 */
const getMany = async (req, res) => {
 const categories = await Brand.find()
  
  res.json(categories)
}

/**
 * add a new brand
 * @param {name, description} req 
 * @param {*} res 
 */
const addOne = async (req, res) => {
  console.log(req.body)
  console.log('1')
  if(!req.file) {
    console.log('no file')
  }
  const {name, description } = req.body

  if(!name) {
    return res.status(400).json({
      errors: [
        {field: "name", message: "name field is required"}
      ]
    })
  }

  const newBrand =  new Brand({
    name,
    description: description ? description : null
  }) 

  await newBrand.save()
  res.json(newBrand)
}

/**
 * delete a brand by id
 * @param {id} req 
 * @param {*} res 
 */
const deleteOne = async (req, res) => {
  const { id } = req.params
  
  await Brand.findByIdAndDelete(id)

  res.json({success: true})
}

module.exports = {
  getMany,
  addOne,
  deleteOne
}