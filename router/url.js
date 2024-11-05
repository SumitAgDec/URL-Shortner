const express = require('express')
const { handleNewShortURL, handleShortURL, handleAnalyticsShortURL } = require('../controllers/url')
const router = express.Router()

router
.post('/', handleNewShortURL)
.get('/:shortId', handleShortURL)
.get('/analytics/:shortId', handleAnalyticsShortURL)

module.exports = router