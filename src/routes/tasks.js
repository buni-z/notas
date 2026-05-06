const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasksController')

router.use(authMiddleware)

router.get('/lists/:id/tasks', getTasks)
router.post('/lists/:id/tasks', createTask)
router.put('/tasks/:id', updateTask)
router.delete('/tasks/:id', deleteTask)

module.exports = router