const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../middlewares/prisma')

const register = async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await prisma.user.findUnique({ where: { email } })
  if (userExists) {
    return res.status(400).json({ error: 'Email já cadastrado' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, passwordHash }
  })

  return res.status(201).json({ id: user.id, name: user.name, email: user.email })
}

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ error: 'Email ou senha inválidos' })
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash)
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Email ou senha inválidos' })
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

  return res.json({ token })
}

module.exports = { register, login }