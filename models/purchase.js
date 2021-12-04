
const { Schema, model } = require('mongoose');

const PurchaseSchema = Schema({
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
    },
    Stock: {
        type: Number,
        default: 0
    }
});

PurchaseSchema.methods.toJSON = function() {
    const {__v, ... purchase } = this.toObject();
    return purchase;
}

module.exports = model('Purchase', PurchaseSchema);