const Brand = require("../models/Brand");

// get all brands
const getMany = async (req, res) => {
  const categories = await Brand.find();

  res.json(categories);
};

// add a new brand
const addOne = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      errors: [{ field: "image", message: "image field is required" }],
    });
  }
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      errors: [{ field: "name", message: "name field is required" }],
    });
  }

  const newBrand = new Brand({
    name,
    description: description,
    image: req.file.filename,
  });

  await newBrand.save();
  res.json(newBrand);
};

// delete a brand by id
const deleteOne = async (req, res) => {
  const { id } = req.params;

  await Brand.findByIdAndDelete(id);

  res.json({ success: true });
};

module.exports = {
  getMany,
  addOne,
  deleteOne,
};