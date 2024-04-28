const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');

// Get all products
router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        connection.query('SELECT * FROM products', (err, products) => {
            connection.release();
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.json(products);
        });
    });
});

// Get single product
router.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        connection.query('SELECT * FROM products WHERE ProductID = ?', [req.params.id], (err, product) => {
            connection.release();
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            if (!product || product.length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product[0]);
        });
    });
});

// Post a product
router.post('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        connection.query('INSERT INTO products SET ?', [req.body], (err, result) => {
            connection.release();
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(201).json({ message: 'Product inserted successfully', productId: result.insertId });
        });
    });
});

// Delete a product
router.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        connection.query('DELETE FROM products WHERE ProductID = ?', [req.params.id], (err, result) => {
            connection.release();
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        });
    });
});

// Update a product
router.patch('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        connection.query('UPDATE products SET ? WHERE ProductID = ?', [req.body, req.params.id], (err, result) => {
            connection.release();
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product updated successfully' });
        });
    });
});

module.exports = router;
