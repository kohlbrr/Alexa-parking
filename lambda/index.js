'use strict'

const Alexa = require('alexa-sdk')

/*** HELPER FUNCTIONS ***/

// Interpret GET requests w/o import
const getContent = (url) => {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? require('https') : require('http')
    const request = lib.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(`GET failed; Status code: ${response.statusCode}`))
      }
      const body = []
      response.on('data', (chunk) => body.push(chunk))
      response.on('end', () => resolve(body.join('')))
    })
    request.on('error', (err) => reject(err))
  })
}

const alternatePhoneme = `<phoneme alphabet="ipa" ph="ɔ: l t ɜ: n ə t  ">alternate</phoneme>`

const addPhonemes = (res) => {
  return res.replace(/[Aa]lternate/g, alternatePhoneme)
}

/*** END HELPER FUNCTIONS ***/

const getAspUrl = `https://api.cityofnewyork.us/311/v1/municipalservices?app_id=${process.env.ASP_311_APP_ID}&app_key=${process.env.ASP_311_APP_KEY}`
const HELP_MESSAGE = `I will tell you if ${alternatePhoneme} Side Parking is in effect in New York City` // TODO
const STOP_MESSAGE = 'Goodbye' // TODO

const handlers = {
  'LaunchRequest': function() {
    this.emit('GetASPInfo')
  },
  'AlternateSideParking': function() {
    this.emit('GetASPInfo')
  },
  'GetASPInfo': function() {
    getContent(getAspUrl)
    .then(res => JSON.parse(res))
    .then(res => {
      return ({ // TODO: Clean this up
        today: res.items[0].today_id,
        status: res.items[0].items[0].status,
        message: res.items[0].items[0].details
      })
    })
    .then(res => {
        console.log(res)
      this.emit(':tell', addPhonemes(res.message))
    })
  },
  'AMAZON.HelpIntent': function() {
    const speechOutput = HELP_MESSAGE
    const reprompt = HELP_MESSAGE
    this.emit(':ask', speechOutput, reprompt)
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', STOP_MESSAGE)
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', STOP_MESSAGE)
  },
}

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context)
  alexa.APP_ID = process.env.APP_ID
  alexa.registerHandlers(handlers)
  alexa.execute()
}
