// src/routes/products.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router = express.Router();
const Product = require('../models/Product');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique
    },
});

const upload = multer({ storage: storage });

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new product with file upload
router.post('/products', upload.single('productImage'), async (req, res) => {
    const productData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        productImage: req.file ? req.file.path : undefined, // Save the path to the uploaded file
        // Add more fields as needed
    };

    try {
        // Explicitly set the _id field
        productData._id = new mongoose.Types.ObjectId();

        // Insert the product data into the MongoDB collection
        await Product.create(productData);

        // Fetch the newly created document from the database
        const newProduct = await Product.findOne(productData);

        // Respond with the fetched product data
        res.status(201).json({
            _id: newProduct._id,
            name: newProduct.name,
            price: newProduct.price,
            description: newProduct.description,
            productImage: newProduct.productImage,
            createdAt: newProduct.createdAt,
            updatedAt: newProduct.updatedAt,
            // Add more fields as needed
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: error.message });
    }
});


// Update a product by ID (PATCH request)
router.patch('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updateFields = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
