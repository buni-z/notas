const prisma = require('../middlewares/prisma')

const getTasks = async (req, res) => {
  const { id } = req.params

  const list = await prisma.list.findUnique({ where: { id } })

  if (!list || list.userId !== req.userId) {
    return res.status(404).json({ error: 'Lista não encontrada' })
  }

  const tasks = await prisma.task.findMany({
    where: { listId: id },
    include: { checklistItems: true }
  })

  return res.json(tasks)
}

const createTask = async (req, res) => {
  const { id } = req.params
  const { title, dueDate } = req.body

  const list = await prisma.list.findUnique({ where: { id } })

  if (!list || list.userId !== req.userId) {
    return res.status(404).json({ error: 'Lista não encontrada' })
  }

  const task = await prisma.task.create({
    data: { title, dueDate, listId: id }
  })

  return res.status(201).json(task)
}

const updateTask = async (req, res) => {
  const { id } = req.params
  const { title, done, dueDate } = req.body

  const task = await prisma.task.findUnique({
    where: { id },
    include: { list: true }
  })

  if (!task || task.list.userId !== req.userId) {
    return res.status(404).json({ error: 'Tarefa não encontrada' })
  }

  const updated = await prisma.task.update({
    where: { id },
    data: { title, done, dueDate }
  })

  return res.json(updated)
}

const deleteTask = async (req, res) => {
  const { id } = req.params

  const task = await prisma.task.findUnique({
    where: { id },
    include: { list: true }
  })

  if (!task || task.list.userId !== req.userId) {
    return res.status(404).json({ error: 'Tarefa não encontrada' })
  }

  await prisma.task.delete({ where: { id } })
  return res.status(204).send()
}

module.exports = { getTasks, createTask, updateTask, deleteTask }