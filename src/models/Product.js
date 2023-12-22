// src/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: String,
    // Add more fields as needed
}, { timestamps: true }); // Add timestamps option

// Make name and price not required during updates
productSchema.path('name').required(false);
productSchema.path('price').required(false);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
