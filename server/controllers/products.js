const Product = require('../models/Product')

/**
 * get all products
 * @param {limit, offset} req 
 * @param {*} res 
 */
const getMany = async (req, res) => {
  const {limit, offset, isOld} = req.query
  let conditions = {}

  if(typeof isOld !== 'undefined') {
    // get all old products
    if(isOld == 'true') {
      conditions = {...{isOld: true}}

    //get all new products
    } else if(isOld == 'false'){
      conditions = {...{isOld: false}}
    }
  }
  console.log(conditions)

  const products = await Product.find({isOld: 'desc 22'}).limit(limit ? parseInt(limit) : 0).skip(offset ? parseInt(offset) : 0)
  
  res.json(products)
}

/**
 * add a new brand
 * @param {name, description, image, categoryId, isNew} req 
 * @param {*} res 
 */
const addOne = async (req, res) => {
  if(req.files.length === 0) {
    return res.status(400).json({
      errors: [
        {field: "image", message: "image field is required"}
      ]
    })
  }
  const {name, description, categoryId, isOld } = req.body

  if(!name) {
    return res.status(400).json({
      errors: [
        {field: "name", message: "name field is required"},
      ]
    })
  }
  if(!description ) {
    return res.status(400).json({
      errors: [
        {field: "description", message: "description field is required"},
      ]
    })
  }
  if(!categoryId ) {
    return res.status(400).json({
      errors: [
        {field: "categoryId", message: "category field is required"},
      ]
    })
  }

  let images = []
  req.files.forEach(file => {
    images = [...images, file.filename]
  })

  const newProduct =  new Product({
    name,
    description,
    images,
    categoryId,
    isOld: isOld ? isOld : false
  }) 

  await newProduct.save()
  res.json(newProduct)
}

/**
 * delete a product by id
 * @param {id} req 
 * @param {*} res 
 */
const deleteOne = async (req, res) => {
  const { id } = req.params
  
  await Product.findByIdAndDelete(id)

  res.json({success: true})
}

module.exports = {
  getMany,
  addOne,
  deleteOne
}