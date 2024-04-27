const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');



//Get all products
router.get('/', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Select * from products', (err, products) => {
            connetion.release();

            if (!err) {
                res.send(products)
            }
            else {
                return res.status(500).send(err.message);
            }
        })

    })
});


//Get single product
router.get('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Select * from products where ProductID = ?', [req.params.id], (err, products) => {
            connetion.release();

            if (!err) {
                res.send(products)
            }
            else {
                return res.status(500).send(err.message);
            }
        })

    })
});


//Post a product
router.post('/', (req, res) => {


    
    pool.getConnection((err,connetion) =>{
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Insert into products SET ? ',[req.body],(err,product) =>{
            if(!err){
                res.send("Inserted successfully!")

            }
            else{
                return res.status(500).send(err.message);
            }
        })
    })

});


//Delete a product
router.delete('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Delete from products where ProductID = ?', [req.params.id], (err, products) => {
            connetion.release();

            if (!err) {
                res.send("Deleted successfully!")
            }
            else {
                return res.status(500).send(err.message);
            }
        })

    })
});


//Update a product
router.patch('/:id', (req, res) => {
    
    

    pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            return res.status(500).send('Internal Server Error');
        }
        
        connection.query('UPDATE products SET ? WHERE ProductID = ?', [req.body, req.params.id], (err, result) => {
            connection.release();
            if (!err) {
                res.send("Updated successfully!")
            }
            else {
                return res.status(500).send(err.message);
            }
        });
    });
});

    module.exports = router;