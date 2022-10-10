const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

const login = loginRouter.post('/api/login', async (req, res) => {
  const { body } = req
  const { username, password } = body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    res.status(404).json({ // uso el codigo 404 por lo que dice en el siguiente video: https://youtu.be/wk_PKHlHDDo
      error: 'Y yo que se mi pana'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })

  res.send({
    name: user.name,
    username: user.username,
    token
  })
})

module.exports = {
  login
}
