const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

connectDB()

const port = process.env.PORT || 5000;
const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/tasks', require('./routes/tasksRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Working on port: ${port}`))
