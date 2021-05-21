const express = require('express');

//Create a router to different requests
const router = express.Router();

//GET order request handler
router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

//POST order request handler
router.post('/', (req, res, next)=>{
    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Order was created',
        order: order
    });
});

//GET order with id request handler
router.get('/:orderID', (req, res, next)=>{
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

//DELETE order with id request handler
router.delete('/:orderID', (req, res, next)=>{
    res.status(201).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;