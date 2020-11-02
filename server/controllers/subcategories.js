const SubCategory = require("../models/Subcategory");
const Subcategory = require("../models/Subcategory");

// get all subcategories
const getMany = async (req, res) => {
  const { limit, offset } = req.query;

  const subcategories = await Subcategory.find()
    .limit(limit ? parseInt(limit) : 0)
    .skip(offset ? parseInt(offset) : 0);

  res.json(subcategories);
};

// add a new subcategory
const addOne = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      errors: [{ field: "name", message: "name field is required" }],
    });
  }
  if (!description) {
    return res.status(400).json({
      errors: [
        { field: "description", message: "description field is required" },
      ],
    });
  }

  const newSubcategory = new Subcategory({
    name,
    description,
  });

  await newSubcategory.save();
  res.json(newSubcategory);
};

// delete a category by id
const deleteOne = async (req, res) => {
  const { id } = req.params;

  await SubCategory.findByIdAndDelete(id);

  res.json({ success: true });
};

module.exports = {
  getMany,
  addOne,
  deleteOne,
};
