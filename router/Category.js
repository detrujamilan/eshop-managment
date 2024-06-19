const express = require("express");
const { Category } = require("../models/Category");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = new Category({
      name,
      description,
    });

    await newCategory.save(newCategory);

    res.status(200).send({ message: "Category saved successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getCategory", async (req, res) => {
  try {
    const category = await Category.find();

    if (!category) {
      res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send(category);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedId = await Category.findByIdAndDelete(req.params.id);
    if (!deletedId) {
      res.status(404).send({ message: "Delete category id not found...." });
    }
    res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
