// src/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

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

// Create a new product
// Create a new product
router.post('/products', async (req, res) => {
    const productData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        // Add more fields as needed
    };

    try {
        // Insert the product data into the MongoDB collection
        const result = await Product.create(productData);

        // Respond with the product data from the request
        res.status(201).json({
            _id: result._id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            // Add more fields as needed
        });
    } catch (error) {
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
        const deletedProduct = await Product.findByIdAndRemove(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
