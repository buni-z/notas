const prisma = require('../middlewares/prisma')

const getLists = async (req, res) => {
  const lists = await prisma.list.findMany({
    where: { userId: req.userId },
    include: { tasks: true }
  })
  return res.json(lists)
}

const createList = async (req, res) => {
  const { title, color } = req.body

  const list = await prisma.list.create({
    data: { title, color, userId: req.userId }
  })
  return res.status(201).json(list)
}

const deleteList = async (req, res) => {
  const { id } = req.params

  const list = await prisma.list.findUnique({ where: { id } })

  if (!list || list.userId !== req.userId) {
    return res.status(404).json({ error: 'Lista não encontrada' })
  }

  await prisma.list.delete({ where: { id } })
  return res.status(204).send()
}

module.exports = { getLists, createList, deleteList }