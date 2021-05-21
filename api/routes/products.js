const express = require('express');

//Create a router to different requests
const router = express.Router();

//GET product request handler
router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

//POST product request handler
router.post('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Handling POST requests to /products'
    });
});

//GET product with id request handler
router.get('/:productID', (req, res, next)=>{
    const id = req.params.productID;
    res.status(200).json({
        message:'Hello',
        id: id
    });
});

//GET product with id request handler
router.patch('/:productID', (req, res, next)=>{
    const id = req.params.productID;
    res.status(200).json({
        message:'Updated product!'
    });
});

//GET product with id request handler
router.delete('/:productID', (req, res, next)=>{
    const id = req.params.productID;
    res.status(200).json({
        message:'Deleted product!'
    });
});
module.exports = router;