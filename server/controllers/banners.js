const Banner = require("../models/Banner");

const addOne = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ image: "image field is required" });

    const banner = new Banner({
      image: req.file.filename,
    });
    await banner.save();
    res.json(banner);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getAll = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await Banner.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  addOne,
  getAll,
  deleteOne,
};
