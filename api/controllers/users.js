const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

const getAllUsers = usersRouter.get('/api/users', async (req, res) => {
  const users = await User.find({}).populate('notes', { content: 1, date: 1 })
  res.json(users)
})

const saveUser = usersRouter.post('/api/users', async (req, res) => {
  try {
    const { body } = req
    const { username, name, password } = body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = {
  saveUser,
  getAllUsers
}
