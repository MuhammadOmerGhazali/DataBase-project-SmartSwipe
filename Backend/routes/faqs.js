const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');



//Get all Faqs of a product
router.get('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            return res.status(500).send({message: 'Internal Server Error'});
        }
        connetion.query('Select * from faqs where productId= ?',[req.params.id], (err, faqs) => {
            connetion.release();

            if (!err) {
                res.send(faqs)
            }
            else {
                return res.status(500).send({message: err.message});
            }
        })

    })
});



// Get a single FAQ by its ID
router.get('/single/:faqId', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send({ message: 'Internal Server Error' });
        }
        connection.query('SELECT * FROM faqs WHERE faqId = ?', [req.params.faqId], (err, faq) => {
            connection.release();
            if (!err) {
                if (!faq || faq.length === 0) {
                    return res.status(404).send({ message: 'FAQ not found' });
                }
                res.send(faq);
            } else {
                return res.status(500).send({message: err.message});
            }
        });
    });
});


//Get all Faqs
router.get('/', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            return res.status(500).send({message: 'Internal Server Error'});
        }
        connetion.query('Select * from faqs', (err, faqs) => {
            connetion.release();

            if (!err) {
                res.send(faqs)
            }
            else {
                return res.status(500).send({message: err.message});
            }
        })

    })
});


//Post a Faq
router.post('/', (req, res) => {


    
    pool.getConnection((err,connetion) =>{
        if (err){
            return res.status(500).json({message : 'Internal Server Error'});
        }
        connetion.query('Insert into Faqs SET ? ',[req.body],(err,faqs) =>{
            if(!err){
                return res.status(200).send({message: 'Inserted successfully!'});

            }
            else{
                return res.status(500).send({message: err.message});
            }
        })
    })

});


//Delete a Faq
router.delete('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            return res.status(500).json({message : 'Internal Server Error'});
        }
        connetion.query('Delete from faqs where FAQID = ?', [req.params.id], (err, faqs) => {
            connetion.release();

            if (!err) {
                return res.status(200).send({message: 'Deleted successfully!'});
            }
            else {
                return res.status(500).send({message: err.message});
            }
        })

    })
});


//Update a Faq
router.patch('/:id', (req, res) => {
    
    

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({message : 'Internal Server Error'});
        }
        
        connection.query('UPDATE faqs SET ? WHERE FAQID = ?', [req.body, req.params.id], (err, result) => {
            connection.release();
            if (!err) {
                return res.status(200).send({message: 'Updated successfully!'});
            }
            else {
                return res.status(500).send({message: err.message});
            }
        });
    });
});

    module.exports = router;