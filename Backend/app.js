require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const app = express();




// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended:false}));

//Converting body to json format
app.use(bodyParser.json());




//Error handling for invalid json data
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).send('Invalid JSON data');
    } else {
        next(err); // Pass the error to the next middleware
    }
});




app.use('/api/products',productRoutes);
app.use('/api/categories',categoryRoutes);


//listening to port
app.listen(process.env.PORT,() =>{
    console.log('listening on port', process.env.PORT);
    
});