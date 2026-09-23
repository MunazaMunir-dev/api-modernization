const Product = require("../models/Product");

// GET all products
const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      page = 1,
      limit = 10,
      fields
    } = req.query;

    const filter = {};

    // Filtering
    if (category) {
      filter.category = category;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
      Number.isNaN(pageNumber) ||
      Number.isNaN(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1
    ) {
      return res.status(400).json({
        error_code: "INVALID_PAGINATION",
        message: "Page and limit must be positive numbers",
        timestamp: new Date().toISOString()
      });
    }

    // Field selection
    let query = Product.find(filter);

    if (fields) {
      const selectedFields = fields.split(",").join(" ");
      query = query.select(selectedFields);
    }

    const skip = (pageNumber - 1) * limitNumber;

    const products = await query
      .skip(skip)
      .limit(limitNumber);

    const totalProducts = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      page: pageNumber,
      limit: limitNumber,
      total: totalProducts,
      products
    });
  } catch (error) {
    next(error);
  }
};


// GET single product
const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fields } = req.query;

    let query = Product.findById(id);

    // Field filtering
    if (fields) {
      const selectedFields = fields.split(",").join(" ");
      query = query.select(selectedFields);
    }

    const product = await query;

    if (!product) {
      return res.status(404).json({
        error_code: "PRODUCT_NOT_FOUND",
        message: "Product not found",
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};


// CREATE product
const createProduct = async (req, res, next) => {
  try {
    const { title, price, category, description, vendor, stock } = req.body;

    // Validation
    if (!title || price === undefined || !category) {
      return res.status(400).json({
        error_code: "INVALID_PRODUCT_DATA",
        message: "Title, price and category are required",
        timestamp: new Date().toISOString()
      });
    }

    const product = await Product.create({
      title,
      price,
      category,
      description,
      vendor,
      stock
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (error) {
    next(error);
  }
};


// UPDATE product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        error_code: "PRODUCT_NOT_FOUND",
        message: "Product not found",
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    next(error);
  }
};


// DELETE product
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        error_code: "PRODUCT_NOT_FOUND",
        message: "Product not found",
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};