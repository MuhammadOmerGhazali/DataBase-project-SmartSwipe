const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');



//Get all Orders of a customer
router.get('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Select * from orders where customerId= ?',[req.params.id], (err, orders) => {
            connetion.release();

            if (!err) {
                res.send(orders)
            }
            else {
                return res.status(500).send(err.message);
            }
        })

    })
});


//Get all Orders
router.get('/', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Select * from orders', (err, orders) => {
            connetion.release();

            if (!err) {
                res.send(orders)
            }
            else {
                return res.status(500).send(err.message);
            }
        })

    })
});




//Place an Order
router.post('/', (req, res) => {


    
    pool.getConnection((err,connetion) =>{
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Insert into Orders SET ? ',[req.body],(err,orders) =>{
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
        
        connection.query('UPDATE Orders SET Orderstatus = ? WHERE orderID = ?', [req.body.OrderStatus, req.params.id], (err, orders) => {
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