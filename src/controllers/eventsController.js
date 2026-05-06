const prisma = require('../middlewares/prisma')

const getEvents = async (req, res) => {
  const { month } = req.query

  const where = { userId: req.userId }

  if (month) {
    const start = new Date(`${month}-01`)
    const end = new Date(start)
    end.setMonth(end.getMonth() + 1)
    where.date = { gte: start, lt: end }
  }

  const events = await prisma.calendarEvent.findMany({ where })
  return res.json(events)
}

const createEvent = async (req, res) => {
  const { title, date, description } = req.body

  const event = await prisma.calendarEvent.create({
    data: { title, date: new Date(date), description, userId: req.userId }
  })

  return res.status(201).json(event)
}

const deleteEvent = async (req, res) => {
  const { id } = req.params

  const event = await prisma.calendarEvent.findUnique({ where: { id } })

  if (!event || event.userId !== req.userId) {
    return res.status(404).json({ error: 'Evento não encontrado' })
  }

  await prisma.calendarEvent.delete({ where: { id } })
  return res.status(204).send()
}

module.exports = { getEvents, createEvent, deleteEvent }