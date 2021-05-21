//Import express module
const express = require('express');
//Create an express application
const app = express();

//Import route from products
const productRoutes = require('./api/routes/products');
//Import route from orders
const orderRoutes = require('./api/routes/orders');

//Filter requests which start with '/products' and redirect them to products.js
app.use('/products', productRoutes);
//Filter requests which start with '/orders' and redirect them to orders.js
app.use('/orders', orderRoutes);


module.exports = app;