// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products'); // Import your product routes

const app = express();

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });


// Middleware configuration
app.use(bodyParser.urlencoded({ extended: true }));

// Use your product routes
app.use('/api', productRoutes);

// Middleware to log requests (add this before the error handling middleware)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Check database connection
app.get('/check-db-connection', async (req, res) => {
    try {
        await mongoose.connection.db.command({ ping: 1 });
        res.status(200).send('Database connection successful!');
    } catch (error) {
        res.status(500).json({ message: 'Database connection error', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
