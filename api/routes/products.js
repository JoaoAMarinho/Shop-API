const express = require('express');
const mongoose = require('mongoose');

//Create a router to different requests
const router = express.Router();

const Product = require('../models/product');

//GET products request handler
router.get('/', (req, res, next)=>{
    Product.find()
        .select("name price _id")
        .exec()
        .then( docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
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

//POST product request handler
router.post('/', (req, res, next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then( result=> {
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            });
        })
        .catch( err => {
            console.log(err);

            res.status(500).json({
                error:err
            });
        });
});

//GET product with id request handler
router.get('/:productID', (req, res, next)=>{
    const id = req.params.productID;
    Product.findById(id)
        .select("name price _id")
        .exec()
        .then( doc => {
            const result = {
                product: doc,
                request: {
                    type: 'GET',
                    url:'http://localhost:3000/products'
                }
            }
            doc ? res.status(200).json(result) : res.status(404).json({ message: 'No valid entry found for provided ID'});
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({error:err});
        });
});

//GET product with id request handler
router.patch('/:productID', (req, res, next)=>{
    const id = req.params.productID;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then( result => {
            
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({erro: err});
        });
});

//GET product with id request handler
router.delete('/:productID', (req, res, next)=>{
    const id = req.params.productID;
    Product.deleteOne({_id: id})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products',
                    body: { name: 'String', price: 'Number'}
                }
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({erro: err});
        });
});
module.exports = router;