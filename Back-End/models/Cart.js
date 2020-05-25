const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    email: {
        type: Number,
        required: true
    },
    address: {
        type: Number,
        default: 0
    },
    address2: {
        type: Number,
        default: 0
    },
    country: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    same_address: {
        type: String
    },
    save_info: {
        type: String
    },
    credit: {
        type: String
    },
    debit: {
        type: String
    },
    paypal: {
        type: String
    },
    cc_name: {
        type: String
    },
    cc_number: {
        type: String
    },
    cc_cvv: {
        type: String
    },
    cc_expiration: {
        type: String
    },
    selectedProduct: {
        type: String
    },
    cartItems: {
        type: String
    },
    totalValue: {
        type: String
    },


});

module.exports = mongoose.model('Cart', cartSchema);
