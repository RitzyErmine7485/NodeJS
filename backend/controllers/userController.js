const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")

const register = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Bad Request: Data incomplete')
    }

    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error('Bad Request: Existent user')
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json(user)
})

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: genToken(user.id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid credentials")
    }
})

const genToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const showdata = asyncHandler( async (req, res) => {
    res.status(200).json(req.user)
})

module.exports = {
    register,
    login,
    showdata
}