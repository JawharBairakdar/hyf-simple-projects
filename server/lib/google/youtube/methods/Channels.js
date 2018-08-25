const InitialGoogleService = require('../InitialGoogleService')
const { google } = require('googleapis');

class Channels extends InitialGoogleService {
  constructor(path) {
    super(path)
  }
  /**
   * @version 1.0 
   *  -- For More researching when needed --
   * 
   * @param {Object} options 
   * @param {Function} callback 
   * @example 
   * Options: {
   *   part, //~> string: auditDetails, brandingSettings, contentDetails, contentOwnerDetails, id, invideoPromotion, localizations, snippet, statistics, status, topicDetails...
   *   maxResults,
   *   username,
   *   id
   * }
   */
  channels_list(options, callback, next) {
    return auth => {

      const shared = {
        part: options.part || 'snippet,contentDetails,statistics',
        id: options.id,
        maxResults: options.maxResults || 5,
      }

      // For More ~> https://developers.google.com/youtube/v3/docs/channels/list
      const listOptions = {
        auth: auth,
        ...shared,
        forUsername: options.username, // The forUsername parameter specifies a YouTube username, thereby requesting the channel associated with that username.
        ...options
      }

      const service = google.youtube('v3');

      service.channels.list(listOptions, function (err, response) {
        if (err) {
          next({ ok: false, ...err, type: 'API Error' });
          return;
        }
        callback({
          ok: true,
          ...shared,
          username: options.username || 'no username filter specified',
          response: response.data.items.length ? response.data : null
        })
      });
    }
  }

}

module.exports = Channels