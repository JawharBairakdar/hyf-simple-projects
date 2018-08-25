const InitialGoogleService = require('../InitialGoogleService')
const { google } = require('googleapis');

class Search extends InitialGoogleService {
  constructor(path) {
    super(path)
  }

  /**
   * @default options.type: 'video'
   * @default options.part: 'snippet'
   * @default options.videoEmbeddable: true
   * @default options.maxResults: 5
   * 
   * @example
   * Options: {type, part, videoEmbeddable, maxResults, order, channelId, channelType, query}
   * @description
   * order: date, rating, relevance, title, videoCount, viewCount
   * @description
   * videoEmbeddable: any, true
   * @description
   * type: video, playlist, channel
   * @description
   * query: The q parameter specifies the query term to search for. Your request can also use  the Boolean NOT (-) and OR (|) operators to exclude videos or to find videos  that are associated with one of several search terms. For example, to search  for videos matching either "boating" or "sailing", set the q parameter value to boating|sailing. Similarly, to search for videos matching either "boating"  or "sailing" but not "fishing", set the q parameter value to boating|sailing -fishing Note that the pipe character must be URL-escaped when it is sent in your API request. The URL-escaped value for the pipe character is %7C
   * @example
   * For More https://developers.google.com/youtube/v3/docs/search/list
   * @param {Object} options 
   * @param {Function} callback 
   */
  search_list(options, callback, next) {
    return auth => {

      const shared = {
        type: options.type || 'video',
        part: options.part || 'snippet',
        videoEmbeddable: options.type === 'video' ? true : undefined,
        maxResults: options.maxResults || 5,
        ...options,
      }

      const listOptions = {
        ...shared,
        auth: auth,
        q: options.query,
      }

      const service = google.youtube('v3');

      service.search.list(listOptions, function (err, response) {

        if (err) {
          next({ ok: false, ...err, type: 'API Error' });
          return;
        }
        callback({
          ok: true,
          ...shared,
          query: options.query,
          response: response.data.items.length ? response.data : null
        })
      });
    }
  }

  /**
   * @default options.type: 'video'
   * @default options.part: 'snippet,contentDetails,statistics'
   * 
   * @example
   * Options: {type, part, channelId, maxResults, id}
   * @description
   * type: video, playlist, channel
   * @description
   * part: contentDetails, fileDetails, id, liveStreamingDetails, localizations, player, processingDetails, recordingDetails, snippet, statistics, status, suggestions, topicDetails
   * @example
   * For More https://developers.google.com/youtube/v3/docs/videos/list
   * @param {Object} options 
   * @param {Function} callback 
   */
  videos_list(options, callback, next) {
    return (auth) => {

      const shared = {
        type: options.type || 'video',
        part: options.part || 'snippet,contentDetails,statistics',
        ...options
      }

      const listOptions = {
        auth: auth,
        ...shared,
      }

      const service = google.youtube('v3');

      service.videos.list(listOptions, function (err, response) {

        if (err) {
          next({ ok: false, ...err, type: 'API Error' });
          return;
        }
        callback({
          ok: true,
          ...shared,
          response: response.data.items.length ? response.data : null
        })
      });
    }
  }
}


module.exports = Search