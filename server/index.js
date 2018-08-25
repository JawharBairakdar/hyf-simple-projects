const express = require('express')
const morgan = require('morgan')

const app = express()

const cors = require('cors')

app.use(cors())

const tools = require('./util/converters')
const errors = require('./mains/errors')

// - error-messages
app.use(errors)

const { api } = require('./router')

// - Dev Options
app.use(morgan('dev'))

// - Root Routes
app.use('/api', api)

// - Not Found Route
app.use((req, res, next) => {
  const { notFound } = req.errors
  next(notFound)
})

// - Error Handling
app.use((err, req, res, next) => {
  if (tools.JSONString(err)) {
    res.json(err)
    console.log(err)
    return
  }
  if (err.response) {
    const error = err.response
    const errorResponse = req.errors.assignError(error)
    res.statusCode = error.status
    res.json(errorResponse)
    console.log(errorResponse)
    return
  }
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})