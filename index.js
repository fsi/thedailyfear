require('dotenv').load()
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const RateLimiter = require('limiter').RateLimiter
const config = require('./config')

const corpus = fs.readFileSync(config.corpusFile, 'utf8')
const corpusLength = corpus.length

const app = express()
const corsOptions = {
  origin: config.corsOrigin
}

const limiter = new RateLimiter(1, 100, true)

if (process.env === 'DEV') {
  app.use(express.static('public'))
}

app.get('/fear', cors(corsOptions), (req, res) => {
  limiter.removeTokens(1, (error, remainingRequests) => {
    if (error) {
      return void res.status(500).end()
    }
    if (remainingRequests < 0) {
      return void res.status(420).end()
    }
    const idx = Math.round(Math.random() * corpusLength) - config.minQuoteLength
    const len = getQuoteLength()
    const text = corpus.slice(idx, idx + len)
    res.json({ text })
  })
})

function getQuoteLength () {
  return (
    config.minQuoteLength +
    Math.round(Math.random() * (config.maxQuoteLength - config.minQuoteLength))
  )
}

const port = process.env.HTTP_PORT || 3000
const host = process.env.HTTP_HOST || '127.0.0.1'
app.listen(port, host, () => {
  console.log('listening on %s:%s', host, port)
})
