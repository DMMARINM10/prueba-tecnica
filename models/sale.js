
const { Schema, model } = require('mongoose');

const SaleSchema = Schema({
    // type, unique, required, default, enum
    Date: {
        type: Date,
        default: new Date
    },
    Quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    idProduct: {
        type: String,
        required: [true, 'idProduct is required']
    },
    ProductName: {
        type: String,
        required: [true, 'Product name is required']
    }
});

SaleSchema.methods.toJSON = function() {
    const {__v, ... sale } = this.toObject();
    return sale;
}

module.exports = model('Sale', SaleSchema);