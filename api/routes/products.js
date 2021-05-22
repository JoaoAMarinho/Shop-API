const express = require('express');
const mongoose = require('mongoose');

//Create a router to different requests
const router = express.Router();

const Product = require('../models/product');

//GET products request handler
router.get('/', (req, res, next)=>{
    Product.find()
        .exec()
        .then( docs => {
            console.log(docs);
            docs.length > 0 ? res.status(200).json(docs) : res.status(200).json({message: 'No content found'});
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
            console.log(result);

            res.status(201).json({
                message: 'Handling POST requests to /products',
                createdProduct: result
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
        .exec()
        .then( doc => {
            console.log("From database",doc);
            doc ? res.status(200).json(doc) : res.status(404).json({ message: 'No valid entry found for provided ID'});
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
            console.log(result);
            res.status(200).json(result);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({erro: err});
        });
});

//GET product with id request handler
router.delete('/:productID', (req, res, next)=>{
    const id = req.params.productID;
    Product.remove({_id: id})
        .exec()
        .then( result => {
            res.status(200).json(result);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({erro: err});
        });
});
module.exports = router;