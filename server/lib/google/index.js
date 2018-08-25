const Channel = require('./youtube/service/extendsChannel/Get')
const Search = require('./youtube/service/extendsSearch/Get')


exports.youtube = path => ({
  channels: new Channel(path),
  search: new Search(path)
})