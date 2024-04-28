require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const paymentMethodRoutes = require('./routes/paymentMethods');
const customerCartRoutes = require('./routes/customerCart');
const faqsRoutes = require('./routes/faqs');
const ordersRoutes = require('./routes/orders');
const OrderedproductsRoutes = require('./routes/orderedProducts');
const paymentsRoutes = require('./routes/payments');
const reviewRoutes = require('./routes/reviews');
const uaqsRoutes = require('./routes/uaqs');
const app = express();


app.use((req, res, next) => {
    console.log('Requested:', req.method, req.originalUrl);
    next(); // Pass control to the next middleware
});

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended:false}));

//Converting body to json format
app.use(bodyParser.json());




//Error handling for invalid json data
app.use((err, req, res, next) => {
    console.log(req.path,req.method)
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).send('Invalid JSON data');
    } else {
        console("requested");
        next(err); // Pass the error to the next middleware
    }
});



//Middleware for hadling API calls
app.use('/api/products',productRoutes);
app.use('/api/categories',categoryRoutes);
app.use('/api/paymentmethods',paymentMethodRoutes);
app.use('/api/customerCart',customerCartRoutes);
app.use('/api/faqs',faqsRoutes);
app.use('/api/orders',ordersRoutes);
app.use('/api/orderedproducts',OrderedproductsRoutes);
app.use('/api/payments',paymentsRoutes);
app.use('/api/reviews',reviewRoutes);
app.use('/api/uaqs',uaqsRoutes);









//listening to port
app.listen(process.env.PORT,() =>{
    console.log('listening on port', process.env.PORT);
    
});