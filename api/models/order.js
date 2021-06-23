const mongoose = require('mongoose');

//Create a product schema in order to save products
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, default: 1}
});

//Export model with name of the model and the schema
module.exports = mongoose.model('Order', orderSchema);