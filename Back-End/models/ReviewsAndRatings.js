const mongoose = require('mongoose')

const itemRatingsAndReviewsSchema = new mongoose.Schema({
    itemID: {
        type: String,
        required: true,
    },
    clientName: {
        type: String,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('ReviewsAndRatings', itemRatingsAndReviewsSchema)