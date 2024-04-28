const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');



//Get all ordered Products of a given orderId
router.get('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('SELECT * FROM OrderedProducts JOIN Products ON OrderedProducts.ProductID = Products.ProductID WHERE OrderedProducts.OrderID = ?',[req.params.id], (err, products) => {
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





// Add ordered products
router.post('/', (req, res) => {


    
    pool.getConnection((err,connetion) =>{
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Insert into Orderedproducts SET ? ',[req.body],(err,products) =>{
            if(!err){
                res.send("Inserted successfully!")

            }
            else{
                return res.status(500).send(err.message);
            }
        })
    })

});



    module.exports = router;