const tools = require('../../util/converters')


const assignDistributer = (req, res, next) => {
  const { userRole, classNumber } = req.params
  const { id, query, defaults } = req.query

  // in case existing defaults and query in the same time we need only a one

  const distributer = {
    userRole, // Optional: guest OR student
    classNumber, // Optional: class number
    query,
    id,
    defaults: tools.JSONParse(defaults || 'false'),
    ...req.query
  }

  req.distributer = distributer

  next()
}

const searchValidator = (req, res, next) => {

  // this function in only for cleaning the request and make it as specific as possible
  // -- and to make valid if possible or send back an error

  const { distributer } = req
  const { id, query, defaults } = distributer

  const queryAndId = (query && id)
  const queryOrId = query || id

  if (queryAndId) {
    return next(req.errors.badRequest)
  }

  if (id) {
    delete distributer.query
  }

  if (query) {
    delete distributer.id
  }

  if (queryOrId && defaults) {
    // In case the queryOrId sent with the defaults send the queryOrId only back
    distributer.defaults = false
    return next()
  }

  if (!queryOrId && !defaults) {
    // avoiding the side effect as sending the google API defaults
    distributer.defaults = true
    return next()
  }
  // in all cases
  next()
}

module.exports = {
  assignDistributer
  , searchValidator
}