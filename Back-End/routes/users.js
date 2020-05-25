const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Getting all
router.get('/', async (req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getUser , (req,res) => {
    res.json(res.User)
})

// Creating One
router.post('/', async (req,res) => {
    const users = new User({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        role: req.body.role,
        contactNo: req.body.contactNo,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    })

    try{
        const User = await users.save()
        res.status(201).json(User)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Updating One
router.patch('/:id', getUser , async (req,res) => {
    if (req.body.fullName != null) {
        res.User.fullName = req.body.fullName
    }
    if (req.body.userName != null) {
        res.User.userName = req.body.userName
    }
    if (req.body.password != null) {
        res.User.password = req.body.password
    }
    if (req.body.role != null) {
        res.User.role = req.body.role
    }
    if (req.body.email != null) {
        res.User.email = req.body.email
    }
    if (req.body.contactNo != null) {
        res.User.contactNo = req.body.contactNo
    }
    try {
        const updatedUser = await res.User.save()
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getUser , async (req,res) => {
    try{
        await res.User.remove()
        res.status(200).json({message: 'Deleted  User'})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

async function getUser (req, res, next) {
    let User
    try {
        User = await User.findById(req.params.id)
        if ( User == null ) {
            return res.status(404).json({ message: 'Cannot find User' })
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }

    res.User = User
    next()
}


module.exports = router
