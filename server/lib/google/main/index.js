const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly']
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE) + '/.credentials/'
const TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json'

const MainErrorObject = param => ({
  ok: false,
  type: 'API Error',
  status: param.status,
  statusText: param.statusText || 'Internal server error',
  description: param.description,
  response: param.err
})

class MainServiceConstructor {
  constructor(path) {
    this.path = path
  }

  /**
   * 
   * @param {Function} method The callback methodology to call after the authorizing success
   * @param {Function} next express in case any error accord
   */
  serve(method, next) {
    this._load(this.path, method, next)
  }

  _load(path, method, next) {
    if (!path) throw "Please insert a client secret path with a json extension"
    if (!method) throw "Please insert a callback function that takes { auth } as the first argument"
    // Load client secrets from a local file.
    fs.readFile(path, this._processClientSecrets(method, next))
  }
  /**
   * Process client secret file...
   * @description taking same arguments as the ( _load ) method
   * @returns {Function} function takes an error on loading client secret file Failed && The authorization client credentials.
   */
  _processClientSecrets(method, next) {
    return (err, content) => {
      if (err) {
        next ?
          next(MainErrorObject({ description: 'Error loading client secret file', response: err }))
          : console.error({ description: 'Error loading client secret file', response: err })
        return
      }
      // Authorize a client with the loaded credentials, then call the YouTube API.
      this._authorize(JSON.parse(content), method, next)
    }
  }
  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   *
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  _authorize(credentials, callback, next) {
    const clientSecret = credentials.installed.client_secret
    const clientId = credentials.installed.client_id
    const redirectUrl = credentials.installed.redirect_uris[0]
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl)

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
      if (err) {
        this._getNewToken(oauth2Client, callback, next)
      } else {
        oauth2Client.credentials = JSON.parse(token)
        callback(oauth2Client)
      }
    })
  }
  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  _getNewToken(oauth2Client, callback, next) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    })

    // both `console & next` needed in case the user didn't know how to arrive to this authUrl
    console.log('Please Authorize this app by visiting this url: ' + authUrl)
    next ?
      next(MainErrorObject({ description: 'Please Authorize this app by visiting this url: ', response: authUrl }))
      : ''
    const rl = readline.createInterface({ // might have a future developing instead
      input: process.stdin,
      output: process.stdout
    })
    rl.question('Enter the code from that page here: ', function (code) {
      rl.close()
      oauth2Client.getToken(code, function (err, token) {
        if (err) {
          next ?
            next(MainErrorObject({ description: 'Error while trying to retrieve access token ', response: err }))
            : console.error({ description: 'Error while trying to retrieve access token ', response: err })
          return
        }
        oauth2Client.credentials = token
        this._storeToken(token, next)
        callback(oauth2Client)
      })
    })
  }
  /**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
  _storeToken(token) {
    try {
      fs.mkdirSync(TOKEN_DIR)
    } catch (err) {
      if (err.code != 'EEXIST') {
        return
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) {
        next ?
          next(MainErrorObject({ description: 'Error: Can\'t Store Token file to ' + TOKEN_PATH, response: err }))
          : console.error({ description: 'Error: Can\'t Store Token file to ' + TOKEN_PATH, response: err })
        return
      }
      console.log({ ok: true, type: 'API Success', status: 201, statusText: 'Created', description: 'Token stored to ' + TOKEN_PATH })
    })
  }
}


module.exports = MainServiceConstructor