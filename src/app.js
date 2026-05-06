const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json())

app.use(express.static('public'))

const authRoutes = require('./routes/auth')
const listsRoutes = require('./routes/lists')
const tasksRoutes = require('./routes/tasks')
const checklistRoutes = require('./routes/checklist')
const eventsRoutes = require('./routes/events')

app.use('/auth', authRoutes)
app.use('/lists', listsRoutes)
app.use(tasksRoutes)
app.use(checklistRoutes)
app.use(eventsRoutes)

module.exports = app

