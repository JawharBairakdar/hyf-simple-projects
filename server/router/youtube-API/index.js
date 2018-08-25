const express = require('express')
const Router = express.Router()

// - Controllers
const { assignDistributer, searchValidator } = require('./routeControl')

// - Routes
const { getVideoById, getVideoByQuery } = require('./search')

const params = '(/?(:userRole)?.(:classNumber)?)?/' // General Params control over the routes

Router.use(params, assignDistributer, searchValidator)

Router.get(params + 'video-id', getVideoById)
Router.get(params + 'video-query', getVideoByQuery)

module.exports = Router