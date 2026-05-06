const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const authRoutes = require('./src/routes/auth')
const listsRoutes = require('./src/routes/lists')
const tasksRoutes = require('./src/routes/tasks')
const checklistRoutes = require('./src/routes/checklist')
const eventsRoutes = require('./src/routes/events')

app.use('/auth', authRoutes)
app.use('/lists', listsRoutes)
app.use(tasksRoutes)
app.use(checklistRoutes)
app.use(eventsRoutes)

module.exports = app

