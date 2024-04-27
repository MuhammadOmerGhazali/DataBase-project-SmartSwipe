const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');

//Get all Products in Cart
router.get('/', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('SELECT * FROM CustomerCart INNER JOIN Products ON CustomerCart.ProductID = Products.ProductID', (err, products) => {
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


//Add product in cart
router.post('/', (req, res) => {


    
    pool.getConnection((err,connetion) =>{
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Insert into CustomerCart SET ? ',[req.body],(err,product) =>{
            if(!err){
                res.send("Inserted successfully!")

            }
            else{
                return res.status(500).send(err.message);
            }
        })
    })

});


//Delete a product from cart
router.delete('/:productId/:CustomerId', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Delete from CustomerCart where CustomerId = ? and ProductId = ?', [req.params.CustomerId,req.params.productId], (err, products) => {
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

module.exports = router;