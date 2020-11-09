const SubCategory = require("../models/Subcategory");
const Subcategory = require("../models/Subcategory");

// get all subcategories
const getMany = async (req, res) => {
  const { limit, offset } = req.query;

  const subcategories = await Subcategory.find().populate("categoryId", [
    "_id",
    "name",
  ]);

  res.json(subcategories);
};

// add a new subcategory
const addOne = async (req, res) => {
  const { name, description, categoryId } = req.body;

  if (!name) {
    return res.status(400).json({
      errors: [{ field: "name", message: "name field is required" }],
    });
  }
  if (!categoryId) {
    return res.status(400).json({
      errors: [{ field: "category", message: "category field is required" }],
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
    categoryId,
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

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, categoryId } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (categoryId) updateData.categoryId = categoryId;

    let category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getMany,
  addOne,
  deleteOne,
  updateOne,
};
