const mongoose = require('mongoose');

//Create a product schema in order to save products
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

//Export model with name of the model and the schema
module.exports = mongoose.model('Product', productSchema);