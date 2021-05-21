//Import express module
const express = require('express');
//Create an express application
const app = express();
//Create a morgan to log requests that happened
const morgan = require('morgan');
//Create a parser for received requests
const bodyParser = require('body-parser');

//Import route from products
const productRoutes = require('./api/routes/products');
//Import route from orders
const orderRoutes = require('./api/routes/orders');

//Apply morgan to log info in the terminal
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Specify headers, CORS(Cross-Origin Resource Sharing) handling
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');

    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type, Accept, Authorization'
    );
    
    if(req.method === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'  
        );
        return res.status(200).json({});
    }
    next();
});

//Filter requests which start with '/products' and redirect them to products.js
app.use('/products', productRoutes);
//Filter requests which start with '/orders' and redirect them to orders.js
app.use('/orders', orderRoutes);
//Error Not Found handler
app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status=404;
    next(error);
});

//General Error Handler
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;