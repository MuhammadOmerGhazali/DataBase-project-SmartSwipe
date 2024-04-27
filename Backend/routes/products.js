const express = require('express');
const router = express.Router();



//Get all products
router.get('/', (req, res) => {
    res.send('Get all products');
});


//Get single product
router.get('/:id', (req, res) => {
    res.send('Get single Product');
 });


 //Post a product
router.post('/', (req, res)=>{
    res.send('Post a product');
    
});


//Delete a product
router.delete('/:id', (req, res)=>{
    res.send('Delete a product');
    
});


//Update a product
router.patch('/:id', (req, res)=>{
    res.send('Update a product');
    
});
module.exports = router;