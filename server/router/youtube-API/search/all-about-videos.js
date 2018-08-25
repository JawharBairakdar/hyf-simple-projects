// - Core
const path = require('path')

const { SERVER_ROOT } = process.env

// - Libraries
const { youtube } = require(SERVER_ROOT + '/lib/google')

// - API Connecting
const { search } = youtube(SERVER_ROOT + '/config/client_secret.json')

const getVideoByQuery = (req, res, next) => {
  const { distributer } = req
  const { query, channelId } = distributer

  search.list({
    query: query ? query : void (0),
    ...distributer,
    channelId: channelId
  }, data => {
    res.json(data)
  }, next)

}

const getVideoById = (req, res, next) => {
  const { distributer } = req
  const { id, channelId } = distributer

  search.videos({
    id: id ? id : void (0),
    ...distributer,
    channelId: channelId
  }, data => {
    res.json(data)
  }, next)
}

module.exports = {
  getVideoByQuery
  , getVideoById
}