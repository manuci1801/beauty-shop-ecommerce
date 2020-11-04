const Category = require("../models/Category");

// get all categories
const getMany = async (req, res) => {
  const { limit, offset } = req.query;

  const categories = await Category.aggregate([
    {
      $lookup: {
        from: "subcategories",
        localField: "_id",
        foreignField: "categoryId",
        as: "subcategories",
      },
    },
  ]);
  // .limit(limit ? parseInt(limit) : 0)
  // .skip(offset ? parseInt(offset) : 0);
  res.json(categories);
};

// add a new category
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

  const newCategory = new Category({
    name,
    description,
  });

  await newCategory.save();
  res.json(newCategory);
};

// delete a category by id
const deleteOne = async (req, res) => {
  const { id } = req.params;

  await Category.findByIdAndDelete(id);

  res.json({ success: true });
};

module.exports = {
  getMany,
  addOne,
  deleteOne,
};
