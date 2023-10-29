const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

//@desc create product
//@route POST /products
const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, image } = req.body;

    // Confirm data
    if (!title || !description || !price || !image) {
        return res.status(400).json({ message: "fill in All fields" });
    }

    // Check for duplicate product title
    const duplicate = await Product.findOne({ title }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: "Duplicate product title" });
    }

    // Create and store the new product
    const product = await Product.create(req.body);

    if (product) {
        // Created
        return res
            .status(201)
            .json({ message: "New product created", product });
    } else {
        return res
            .status(400)
            .json({ message: "Invalid product data received" });
    }
});

//@desc Get all products
//@route GET /products
const getAllProducts = asyncHandler(async (req, res) => {
    //lean prevents methods like save from being attached
    const products = await Product.find().lean();

    // check if db has any products
    if (!products?.length) {
        return res.status(400).json({ message: "No products found" });
    }
    res.json({ products });
});

//@desc Get specific product
//@route GET /products:id
const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    //verify id
    if (!id) {
        return res
            .status(404)
            .json({ message: "no product id in request paramaters" });
    }

    const product = await Product.findById(id).lean().exec();

    //check if product exists
    if (!product) {
        return res.status(404).json({ message: "product not found" });
    }

    res.json({ product });
});

//@desc update product
//@route PATCH /products/:id
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, price, image } = req.body;

    // Confirm data
    if (!title || !description || !price || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Confirm product exists to update
    const product = await Product.findById(id).exec();

    if (!product) {
        return res.status(400).json({ message: "Product not found" });
    }

    // Check for duplicate product
    const duplicateProduct = await Product.findOne({ title }).lean().exec();

    // Allow renaming of only original product
    if (duplicateProduct && duplicateProduct?._id.toString() !== id) {
        return res.status(409).json({
            message: "Duplicate product title,choose different title",
        });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    res.json({
        message: `${updatedProduct.title} has been updated`,
        updatedProduct,
    });
});

//@desc delete product
//@route delete /products/:id
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "product id required" });
    }

    //find product
    const product = await Product.findById(id).exec();
    if (!product) {
        return res.status(400).json({ message: "product not found" });
    }

    const deletedProductInfo = await product.deleteOne();

    res.json({
        message: `Product ${deletedProductInfo.title}  deleted`,
        deletedProductInfo,
    });
});

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
