const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');

//Get all Categories
router.get('/', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Select * from categories', (err, brands) => {
            connetion.release();

            if (!err) {
                res.send(brands)
            }
            else {
                return res.status(500).send(err.message);
            }
        })

    })
});


//Post a Category
router.post('/', (req, res) => {


    
    pool.getConnection((err,connetion) =>{
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Insert into categories SET ? ',[req.body],(err,product) =>{
            if(!err){
                res.send("Inserted successfully!")

            }
            else{
                return res.status(500).send(err.message);
            }
        })
    })

});


//Delete a Category
router.delete('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Delete from categories where Category = ?', [req.params.id], (err, products) => {
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