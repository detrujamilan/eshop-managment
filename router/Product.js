const express = require("express");
const Product = require("../models/Product");
const { Category } = require("../models/Category");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, price, description, category } = req.body;

  try {
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }
    const newProduct = new Product({
      name,
      price,
      description,
      category,
    });

    await newProduct.save();
    res.status(201).send({ message: "Product saved successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(products);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const findProductId = await Product.findByIdAndDelete(req.params.id);
    if (!findProductId) {
      res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send({ message: "Product Delete SuccessFully... " });
  } catch (error) {}
});

router.delete("/:id", async (req, res) => {
  try {
    const findProductId = await Product.findByIdAndDelete(req.params.id);
    if (!findProductId) {
      res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send({ message: "Product Delete SuccessFully... " });
  } catch (error) {}
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const productId = await Product.findById(id);
    if (!productId) {
      res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(productId);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
