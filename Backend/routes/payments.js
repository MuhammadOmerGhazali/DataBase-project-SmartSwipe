const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');



//Get payment of an order
router.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            return res.status(500).send('Internal Server Error');
        }
        connection.query('SELECT * FROM `Orders` JOIN Payments ON `Orders`.orderID = Payments.orderID WHERE `Orders`.orderID = ?', [req.params.id], (err, payments) => {
            connection.release();

            if (!err) {
                res.send(payments);
            } else {
                return res.status(500).send({ message: err.message });
            }
        });
    });
});



//Get all payments
router.get('/', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('SELECT * FROM `Orders` JOIN Payments ON `Orders`.orderID = Payments.OrderID', (err, payments) => {
            connetion.release();

            if (!err) {
                res.send(payments)
            }
            else {
                return res.status(500).send(err.message);
            }
        })

    })
});




//Post payment
router.post('/', (req, res) => {


    
    pool.getConnection((err,connetion) =>{
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Insert into payments SET ? ',[req.body],(err,payments) =>{
            if(!err){
                res.send("Inserted successfully!")

            }
            else{
                return res.status(500).send(err.message);
            }
        })
    })

});





//Update an Order Status
router.patch('/:id', (req, res) => {
    
    

    pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            return res.status(500).send('Internal Server Error');
        }
        
        connection.query('UPDATE payments SET paymentStatus = ? WHERE OrderID = ?', [req.body.PaymentStatus, req.params.id], (err, orders) => {
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