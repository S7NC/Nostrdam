<template>
  <div class="max-w-7xl mx-auto p-6 text-center mt-4">
    <h1 class="text-3xl font-bold mb-8"><a href="https://anchor.fm/s/fc90b274/podcast/rss" class="underline">RSS Feed</a></h1>
  
      <!-- Responsive Grid Layout -->
      <ul v-if="rssItems.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li v-for="(item, index) in rssItems" :key="index" class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <a :href="item.link" target="_blank" class="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline line-clamp-2">
            {{ item.title }}
          </a>
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">{{ item.pubDate }}</p>
          <!-- Render description with clickable links -->
          <div class="flex items-center space-x-2 mt-3">
            <audio :src="item.audio" controls class="w-full dark:filter invert"></audio>
          </div>
        </li>
      </ul>
  
      <p v-else class="text-gray-500 dark:text-gray-400">Loading RSS feed...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const rssItems = ref([])
  const rssTitle = ref('')
  const rssDescription = ref('')
  const rssImage = ref('')
  
  async function fetchRssFeed() {
    try {
      const response = await fetch('/api/rss')
      if (!response.ok) throw new Error('Failed to fetch RSS feed')
      const xmlData = await response.text()
      parseRss(xmlData)
    } catch (error) {
      console.error('Error fetching RSS feed:', error)
    }
  }
  
  function parseRss(xmlData) {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml')
    const channel = xmlDoc.querySelector('channel')
    
    // Set the feed details
    rssTitle.value = channel.querySelector('title')?.textContent || 'No Title'
    rssDescription.value = channel.querySelector('description')?.textContent || 'No Description'
    rssImage.value = channel.querySelector('image url')?.textContent || ''
  
    // Parse the items
    const items = xmlDoc.querySelectorAll('item')
    rssItems.value = Array.from(items).map(item => ({
      title: item.querySelector('title')?.textContent || 'No Title',
      link: item.querySelector('link')?.textContent || '#',
      description: convertUrlsToLinks(item.querySelector('description')?.textContent || 'No Description'),
      pubDate: new Date(item.querySelector('pubDate')?.textContent || '').toLocaleDateString(),
      audio: item.querySelector('enclosure')?.getAttribute('url') || ''
    }))
  }
  
  function convertUrlsToLinks(text) {
    const urlPattern = /https?:\/\/[^\s]+/g
    return text.replace(urlPattern, (url) => `<a href="${url}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">${url}</a>`)
  }
  
  onMounted(fetchRssFeed)
  </script>
  

  