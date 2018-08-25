const Channels = require('../../methods/Channels')


class GetService extends Channels {
  constructor(path) {
    super(path)
  }

  /**
   * Returns a collection of zero or more channel resources that match the request criteria.
   * 
   * @returns {Function} 
   *    A function takes Options as an object and a callback
   */
  get channels() {
    return (options, callback, next) => {
      const { channels_list } = this
      const channel = channels_list(options, callback, next)
      this.serve(channel, next)
      return this
    }
  }
}

module.exports = GetService