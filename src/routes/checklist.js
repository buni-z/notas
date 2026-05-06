const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
const { createItem, updateItem, deleteItem } = require('../controllers/checklistController')

router.use(authMiddleware)

router.post('/tasks/:id/checklist', createItem)
router.put('/checklist/:id', updateItem)
router.delete('/checklist/:id', deleteItem)

module.exports = router