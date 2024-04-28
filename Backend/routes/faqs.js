const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');



//Get all Faqs of a product
router.get('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Select * from faqs where productId= ?',[req.params.id], (err, faqs) => {
            connetion.release();

            if (!err) {
                res.send(faqs)
            }
            else {
                return res.status(500).send(err.message);
            }
        })

    })
});



//Post a Faq
router.post('/', (req, res) => {


    
    pool.getConnection((err,connetion) =>{
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Insert into Faqs SET ? ',[req.body],(err,faqs) =>{
            if(!err){
                res.send("Inserted successfully!")

            }
            else{
                return res.status(500).send(err.message);
            }
        })
    })

});


//Delete a Faq
router.delete('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            connetion.release();
            return res.status(500).send('Internal Server Error');
        }
        connetion.query('Delete from faqs where FAQID = ?', [req.params.id], (err, faqs) => {
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


//Update a Faq
router.patch('/:id', (req, res) => {
    
    

    pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            return res.status(500).send('Internal Server Error');
        }
        
        connection.query('UPDATE faqs SET ? WHERE FAQID = ?', [req.body, req.params.id], (err, result) => {
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