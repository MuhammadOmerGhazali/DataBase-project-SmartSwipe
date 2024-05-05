const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');



//Get all uaqs of a product
router.get('/:id', (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                // If there's an error in getting the connection, handle it here
                return res.status(500).json({message : 'Internal Server Error'});
            }
            connection.query('SELECT * FROM uaqs WHERE productId = ?', [req.params.id], (err, uaqs) => {
                connection.release();

                if (!err) {
                    res.send(uaqs);
                } else {
                    return res.status(500).json({message : err.message});
                }
            });
        });
    } catch (err) {
        // If there's an exception, handle it here
        return res.status(500).json({message : 'Internal Server Error'});
    }
});


//Get SINGLE uaq
router.get('/single/:id', (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                // If there's an error in getting the connection, handle it here
                return res.status(500).json({message : 'Internal Server Error'});
            }
            connection.query('SELECT * FROM uaqs WHERE uaqId = ?', [req.params.id], (err, uaqs) => {
                connection.release();

                if (!err) {
                    res.send(uaqs);
                } else {
                    return res.status(500).json({message : err.message});
                }
            });
        });
    } catch (err) {
        // If there's an exception, handle it here
        return res.status(500).json({message : 'Internal Server Error'});
    }
});



//Get all uaqs

router.get('/', (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                // If there's an error in getting the connection, handle it here
                return res.status(500).json({message : 'Internal Server Error'});
            }
            connection.query('SELECT * FROM uaqs', (err, uaqs) => {
                connection.release();

                if (!err) {
                    res.send(uaqs);
                } else {
                    return res.status(500).json({message : err.message});
                }
            });
        });
    } catch (err) {
        // If there's an exception, handle it here
        return res.status(500).json({message : 'Internal Server Error'});
    }
});




//Post a uaq
router.post('/', (req, res) => {

    try {

        pool.getConnection((err, connetion) => {
            if (err) {
                
                return res.status(500).json({message : 'Internal Server Error'});
            }
            connetion.query('Insert into uaqs SET ? ', [req.body], (err, uaqs) => {
                if (!err) {
                    return res.status(200).json({message : "Inserted successfully!"});

                }
                else {
                    return res.status(500).send({message:err.message});
                }
            });
        });
    } catch (err) {
        // If there's an exception, handle it here
        return res.status(500).json({message : 'Internal Server Error'});
    }

});


//Delete a uaq
router.delete('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err) {
            // connetion.release();
            return res.status(500).send( {message: 'Internal Server Error'});
        }
        connetion.query('Delete from uaqs where uaqID = ?', [req.params.id], (err, uaqs) => {
            connetion.release();

            if (!err) {
                return res.status(200).json({message : "Deleted successfully!"});

            }
            else {
                return res.status(500).send({message:err.message});
            }
        })

    })
});


//Update a uaq
router.patch('/:id', (req, res) => {



    pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            return res.status(500).send( {message: 'Internal Server Error'});
        }

        connection.query('UPDATE uaqs SET ? WHERE uaqID = ?', [req.body, req.params.id], (err, result) => {
            connection.release();
            if (!err) {
                return res.status(200).json({message : "Updated successfully!"});

            }
            else {
                return res.status(500).send({message:err.message});
            }
        });
    });
});

module.exports = router;