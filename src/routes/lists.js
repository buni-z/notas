const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
const { getLists, createList, deleteList } = require('../controllers/listsController')

router.use(authMiddleware)

router.get('/', getLists)
router.post('/', createList)
router.delete('/:id', deleteList)

module.exports = router