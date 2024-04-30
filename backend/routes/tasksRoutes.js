const express = require('express')
const router = express.Router()

const {getTasks, createTask, updateTask, deleteTask} = require('../controllers/tasksController')

router.route('/').get(getTasks).post(createTask)
//router.get('/', getTasks)
//router.post('/', createTasks)

router.route('/:id').put(updateTask).delete(deleteTask)
//router.put('/:id', updateTasks)
//router.delete('/:id', deleteTasks)

module.exports = router