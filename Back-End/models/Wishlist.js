const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    totalValue: {
        type: String
    },

})

module.exports = mongoose.model('Wishlist', wishlistSchema)
