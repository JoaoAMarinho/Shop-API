const express = require('express');
const mongoose = require('mongoose');

//Create a router to different requests
const router = express.Router();

const Order = require('../models/order');
const Product = require('../models/product');

//GET order request handler
router.get('/', (req, res, next)=>{
    Order.find()
    .select("product quantity _id")
    .populate('product', 'name')
    .exec()
    .then( docs => {
        const response = {
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                };
            })
        };
        docs.length > 0 ? res.status(200).json(response) : res.status(200).json({message: 'No content found'});
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

//POST order request handler
router.post('/', (req, res, next)=>{
    Product.findById(req.body.productID)
        .then(product => {
            if(!product) return res.status(404).json({
                    message: "Product not found"
                });
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productID
            });
            return order.save();
        })
        .then( result => {
            res.status(201).json({
                message: 'Created order successfully',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + result._id
                    }
                }
            });
        })
        .catch( err => {
            res.status(500).json({
                message: 'Product not found',
                error: err
            });
        });
});

//GET order with id request handler
router.get('/:orderID', (req, res, next)=>{
    Order.findById(req.params.orderID)
        .select("_id product quantity")
        .populate('product', 'name price')
        .exec()
        .then( order => {
            if(!order) {
                return res.status(404).json({
                    message: 'Order not found!'
                });
            }
            res.status(200).json({
                order: order,
                totalPrice: order.quantity*order.product.price,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            });
        })
        .catch( err => {
            res.status(500).json({
                error: err
            });
        });
});

//DELETE order with id request handler
router.delete('/:orderID', (req, res, next)=>{
    const id = req.params.orderID;
    Order.deleteOne({_id: id})
        .exec()
        .then( result => {
            if(!result.n){
                return res.status(404).json({
                    message: 'Order not found!'
                });
            }
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: { productId: 'ID', quantity: 'Number'}
                }
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({erro: err});
        });
});

module.exports = router;