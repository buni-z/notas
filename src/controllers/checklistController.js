const prisma = require('../middlewares/prisma')

const createItem = async (req, res) => {
  const { id } = req.params
  const { text } = req.body

  const task = await prisma.task.findUnique({
    where: { id },
    include: { list: true }
  })

  if (!task || task.list.userId !== req.userId) {
    return res.status(404).json({ error: 'Tarefa não encontrada' })
  }

  const item = await prisma.checklistItem.create({
    data: { text, taskId: id }
  })

  return res.status(201).json(item)
}

const updateItem = async (req, res) => {
  const { id } = req.params
  const { text, checked } = req.body

  const item = await prisma.checklistItem.findUnique({
    where: { id },
    include: { task: { include: { list: true } } }
  })

  if (!item || item.task.list.userId !== req.userId) {
    return res.status(404).json({ error: 'Item não encontrado' })
  }

  const updated = await prisma.checklistItem.update({
    where: { id },
    data: { text, checked }
  })

  return res.json(updated)
}

const deleteItem = async (req, res) => {
  const { id } = req.params

  const item = await prisma.checklistItem.findUnique({
    where: { id },
    include: { task: { include: { list: true } } }
  })

  if (!item || item.task.list.userId !== req.userId) {
    return res.status(404).json({ error: 'Item não encontrado' })
  }

  await prisma.checklistItem.delete({ where: { id } })
  return res.status(204).send()
}

module.exports = { createItem, updateItem, deleteItem }