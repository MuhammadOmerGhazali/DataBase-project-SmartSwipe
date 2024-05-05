const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');



//Get all Payment Methods
router.get('/', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            // connetion.release();
            return res.status(500).json({message : 'Internal Server Error'});
        }
        connetion.query('Select * from paymentmethods', (err, paymentMethods) => {
            connetion.release();

            if (!err) {
                res.send(paymentMethods)
            }
            else {
                return res.status(500).send({message: err.message});
            }
        })

    })
});


//Get single payment method
router.get('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            // connetion.release();
            return res.status(500).json({message : 'Internal Server Error'});
        }
        connetion.query('Select * from paymentmethods where MethodID = ?', [req.params.id], (err, paymentMethods) => {
            connetion.release();

            if (!err) {
                res.send(paymentMethods)
            }
            else {
                return res.status(500).send({message: err.message});
            }
        })

    })
});


//Post a Payment Method
router.post('/', (req, res) => {


    
    pool.getConnection((err,connetion) =>{
        if (err){
            // connetion.release();
            return res.status(500).json({message : 'Internal Server Error'})

        }
        connetion.query('Insert into paymentmethods SET ? ',[req.body],(err,paymentMethods) =>{
            if(!err){
                res.status(200).send({message: 'Inserted successfully!'})

            }
            else{
                return res.status(500).send({message: err.message});
            }
        })
    })

});


//Delete a Payment Method
router.delete('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            // connetion.release();
            return res.status(500).json({message : 'Internal Server Error'});

        }
        connetion.query('Delete from paymentmethods where MethodID = ?', [req.params.id], (err, paymentMethods) => {
            connetion.release();

            if (!err) {
                res.status(200).send({message: 'Deleted successfully!'})
            }
            else {
                return res.status(500).send({message: err.message});
            }
        })

    })
});


//Update a Payment Method
router.patch('/:id', (req, res) => {
    
    

    pool.getConnection((err, connection) => {
        if (err) {
            // connection.release();
            return res.status(500).json({message : 'Internal Server Error'});

        }
        
        connection.query('UPDATE paymentmethods SET ? WHERE MethodID = ?', [req.body, req.params.id], (err, result) => {
            connection.release();
            if (!err) {
                res.send("Updated successfully!")
            }
            else {
                return res.status(500).send({message: err.message});
            }
        });
    });
});

    module.exports = router;