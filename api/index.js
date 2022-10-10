require('dotenv').config()
require('./mongo')
const express = require('express')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const cors = require('cors')
const app = express()
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const { saveUser, getAllUsers } = require('./controllers/users')
const { getNotes, getNotesById, updateNote, deleteNote, saveNote } = require('./controllers/notes')
const { login } = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use(express.static('../frontend/build'))

Sentry.init({
  dsn: 'https://4db2cffae80946b58daa2a66e9c98699@o1429361.ingest.sentry.io/6780006',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.use('/', getNotes)

app.use('/', getNotesById)

app.use('/', updateNote)

app.use('/', deleteNote)

app.use('/', saveNote)

app.use('/', saveUser, getAllUsers)

app.use('/', login)

if (process.env.NODE_ENV === 'test') {
  const { testingReset } = require('./controllers/testing')
  app.use('/api/testing', testingReset)
}

app.use(notFound)
app.use(Sentry.Handlers.errorHandler())

app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})

module.exports = { app, server }
