const Search = require('../../methods/Search')


class GetService extends Search {
  constructor(path) {
    super(path)
  }

  /**
   * @description 
   * Returns a collection of search results that match the query parameters 
   * specified in the API request. By default, a search result set identifies
   * matching video, channel, and playlist resources, but you can also 
   * configure queries to only retrieve a specific type of resource.
   * @default
   * options.type: 'video'
   * @default
   * options.part: 'snippet'
   * @default
   * options.videoEmbeddable: true
   * @default
   * options.maxResults: 5
   * @example
   * Options: {type, part, videoEmbeddable, maxResults, order, channelId, channelType, query}
   * @description — order: date, rating, relevance, title, videoCount, viewCount
   * @description — videoEmbeddable: any, true
   * @description — type: video, playlist, channel
   * @description — query: The q parameter specifies the query term to search for. Your request can also use the Boolean NOT (-) and OR (|) operators to exclude videos or to find videos that are associated with one of several search terms. For example, to search for videos matching either "boating" or "sailing", set the q parameter value to boating|sailing. Similarly, to search for videos matching either "boating" or "sailing" but not "fishing", set the q parameter value to boating|sailing -fishing Note that the pipe character must be URL-escaped when it is sent in your API request. The URL-escaped value for the pipe character is %7C
   * @example
   * For More https://developers.google.com/youtube/v3/docs/search/list 
   * @returns {Function} 
   *    A function takes Options as an object and a callback
   */
  get list() {
    return (options, callback, next) => {
      const { search_list } = this
      const videoList = search_list(options, callback, next)
      this.serve(videoList, next)
      return this
    }
  }
  /**
   * @description 
   * Returns a list of videos that match the API request parameters.
   * 
   * @default
   * options.type: 'video'
   * @default
   * options.part: 'snippet,contentDetails,statistics'
   * @example
   * Options: {type, part, channelId, maxResults, id}
   * @description — type: video, playlist, channel
   * @description — part: contentDetails, fileDetails, id, liveStreamingDetails, localizations, player, processingDetails, recordingDetails, snippet, statistics, status, suggestions, topicDetails
   * @example
   * For More https://developers.google.com/youtube/v3/docs/videos/list
   * @returns {Function} 
   *    A function takes Options as an object and a callback
   */
  get videos() {
    return (options, callback, next) => {
      const { videos_list } = this
      const videoList = videos_list(options, callback, next)
      this.serve(videoList, next)
      return this
    }
  }
}

module.exports = GetService