const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
const { getEvents, createEvent, deleteEvent } = require('../controllers/eventsController')

router.use(authMiddleware)

router.get('/events', getEvents)
router.post('/events', createEvent)
router.delete('/events/:id', deleteEvent)

module.exports = router