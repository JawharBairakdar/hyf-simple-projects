const express = require('express')
const Router = express.Router()
const youtubeAPI = require('./youtube-API')

Router.use('/search', youtubeAPI)

module.exports = Router