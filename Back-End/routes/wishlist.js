const express = require('express')
const router = express.Router()
const Wishlist = require('../models/Wishlist')


// Getting all
router.get('/', async (req,res) => {
    try{
        const wishlists = await Wishlist.find()
        res.json(wishlists)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getWishlist , (req,res) => {
    res.json(res.wishlist)
})


// Creating One
router.post('/', async (req,res) => {
    const wishlist = new Wishlist({
        productName: req.body.productName,
        totalValue: req.body.totalValue,

    })

    try{
        const newWishlist = await wishlist.save()
        res.status(201).json(newWishlist)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getWishlist , async (req,res) => {

    if (req.body.productName != null) {
        res.cart.productName = req.body.productName
    }
    if (req.body.totalValue != null) {
        res.cart.totalValue = req.body.totalValue
    }
    try {
        const updatedWishlist = await res.wishlist.save()
        res.status(200).json(updatedWishlist)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getWishlist , async (req,res) => {
    try{
        await res.wishlist.remove()
        res.status(200).json({message: 'Deleted Wishlist'})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

async function getWishlist (req, res, next) {
    let wishlist
    try {
        wishlist = await Wishlist.findById(req.params.id)
        if ( cart == null ) {
            return res.status(404).json({ message: 'Cannot find Wishlist' })
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

    res.wishlist = wishlist
    next()
}


module.exports = router
