require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const app = express();


//Global middleware

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.path,req.method)
    next();
})

app.use('/api/products',productRoutes);

//listening to port
app.listen(process.env.PORT,() =>{
    console.log('listening on port', process.env.PORT);
});