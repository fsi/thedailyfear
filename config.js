module.exports = {
  httpHost: process.env.HTTP_HOST || '127.0.0.1',
  httpPort: process.env.HTTP_PORT || 3000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000/',
  corpusFile: process.env.CORPUS_FILE || 'corpus.txt',
  minQuoteLength: Number(process.env.MIN_QUOTE_LENGTH) || 70,
  maxQuoteLength: Number(process.env.MAX_QUOTE_LENGTH) || 140
}
