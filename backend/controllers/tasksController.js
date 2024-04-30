const asyncHandler = require('express-async-handler')
const Task = require('../models/tasksModel')

const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find()
    res.status(200).json(tasks)
})

const createTask = asyncHandler(async (req, res) => {
    if(!req.body.description) {
        res.status(400)
        throw new Error('Add a valid description')
    }
    
    const task = await Task.create({
        description : req.body.description
    })

    res.status(201).json(task)
})

const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)
    if(!task) {
        res.status(404)
        throw new Error('Task not found')
    }

    const update = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(update)
})

const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)
    if(!task) {
        res.status(404)
        throw new Error('Task not found')
    }

    await Task.deleteOne(task)
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}