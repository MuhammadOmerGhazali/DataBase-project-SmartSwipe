const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');



//Get all uaqs of a product
router.get('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Select * from uaqs where productId= ?',[req.params.id], (err, uaqs) => {
            connetion.release();

            if (!err) {
                res.send(uaqs)
            }
            else {
                return res.status(500).send(err.message);
            }
        })

    })
});



//Post a uaq
router.post('/', (req, res) => {


    
    pool.getConnection((err,connetion) =>{
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Insert into uaqs SET ? ',[req.body],(err,uaqs) =>{
            if(!err){
                res.send("Inserted successfully!")

            }
            else{
                return res.status(500).send(err.message);
            }
        })
    })

});


//Delete a uaq
router.delete('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Delete from uaqs where uaqID = ?', [req.params.id], (err, uaqs) => {
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


//Update a uaq
router.patch('/:id', (req, res) => {
    
    

    pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            return res.status(500).send('Internal Server Error');
        }
        
        connection.query('UPDATE uaqs SET ? WHERE uaqID = ?', [req.body, req.params.id], (err, result) => {
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