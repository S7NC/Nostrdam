// server/api/rss.js

import { fetch } from 'node-fetch'

export default defineEventHandler(async (event) => {
  const rssUrl = 'https://anchor.fm/s/fc90b274/podcast/rss'

  try {
    const response = await fetch(rssUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed')
    }
    const rssData = await response.text()
    return rssData
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    return {
      statusCode: 500,
      body: 'Error fetching RSS feed'
    }
  }
})
