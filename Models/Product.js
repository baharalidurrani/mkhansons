const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    _name: {
        type: String,
        trim: true,
        required: true
    },
    _company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    _price: {
        type: Number,
        trim: true,
        required: true
    }
});

var ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;