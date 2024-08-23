const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    crossPrice: { type: Number, default: 0 },
    images: { type: Array, default: [] },
    
    categories: {type: Array, default: []},
    reviews: {type: Array, default: []},
    stock: {type: Number, default: 0},
    filters: {type: Array, default: []},
},
{ timestamps: true });

module.exports = mongoose.model('Product', productSchema);
