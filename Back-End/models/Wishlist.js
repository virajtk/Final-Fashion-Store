const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brandName: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    discount: {
        type: Number,
        default: 0
    },
    mainCategory: {
        type: String
    },
    category: {
        type: String
    },
})

module.exports = mongoose.model('Wishlist', wishlistSchema)
