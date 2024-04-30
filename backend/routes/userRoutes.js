const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')
const {login, register, showdata} = require('../controllers/userController')

router.post('/login', login)
router.post('/register', register)
router.get('/data', protect, showdata)

module.exports = router