const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');



//Get all Reviews of a product
router.get('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            // connetion.release();
            return res.status(500).json({message : 'Internal Server Error'});
        }
        connetion.query('Select * from reviews where productId= ?',[req.params.id], (err, reviews) => {
            connetion.release();

            if (!err) {
                res.send(reviews)
            }
            else {
                return res.status(500).send(err.message);
            }
        })

    })
});



//Get all Reviews
router.get('/', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            // connetion.release();
            return res.status(500).json({message : 'Internal Server Error'});
        }
        connetion.query('Select * from reviews', (err, reviews) => {
            connetion.release();

            if (!err) {
                res.send(reviews)
            }
            else {
                return res.status(500).json({ message: err.message });
            }
        })

    })
});

//Get single Review
router.get('/:productid/:customerid', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            // connetion.release();
            return res.status(500).json({message : 'Internal Server Error'});
        }
        connetion.query('Select * from reviews where productId = ? and customerId= ?', [req.params.productid,req.params.customerid], (err, reviews) => {
            connetion.release();

            if (!err) {
                res.send(reviews)
            }
            else {
                return res.status(500).json({ message: err.message });
            }
        })

    })
});



//Post a Review
router.post('/', (req, res) => {


    
    pool.getConnection((err,connetion) =>{
        if (err){
            // connetion.release();
            return res.status(500).json({message : 'Internal Server Error'});
        }
        connetion.query('Insert into reviews SET ? ',[req.body],(err,reviews) =>{
            if(!err){
                res.send("Inserted successfully!")

            }
            else{
                return res.status(500).json({ message: err.message });
            }
        })
    })

});


//Delete a Review
router.delete('/:productid/:customerid', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            // connetion.release();
            return res.status(500).json({message : 'Internal Server Error'});
        }
        connetion.query('Delete from reviews where productId = ? and customerId= ?', [req.params.productid,req.params.customerid], (err, reviews) => {
            connetion.release();

            if (!err) {
                return res.status(200).json({message: 'Deleted successfully!'})
            }
            else {
                return res.status(500).json({ message: err.message });
            }
        })

    })
});


//Update a Review
router.patch('/:productid/:customerid', (req, res) => {
    
    

    pool.getConnection((err, connection) => {
        if (err) {
            // connection.release();            

            return res.status(500).json({message : 'Internal Server Error'});
        }
        
        connection.query('UPDATE reviews SET ? WHERE productId = ? and customerId= ?', [req.body,req.params.productid,req.params.customerid], (err, reviews) => {
            connection.release();
            if (!err) {
                return res.status(200).json({message: 'Updated successfully!'})
            }
            else {
                return res.status(500).json({ message: err.message });
            }
        });
    });
});

    module.exports = router;