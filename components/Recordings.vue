<template>
    <div class="max-w-4xl mx-auto p-6 text-center mt-10">
      <h1 class="text-3xl font-bold mb-8">Event Video Archive</h1>
      <div v-for="video in videos" :key="video.id" class="mb-16">
        <iframe
          :src="`https://www.youtube.com/embed/${video.videoId}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-full h-80 mb-4 rounded-lg shadow-lg"
        ></iframe>
        <div class="text-left">
          <h2 class="text-2xl font-semibold mb-2">{{ video.title }}</h2>
          <p class="text-gray-700 dark:text-white mb-4">{{ video.description }}</p>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const videos = [
    {
      id: 1,
      videoId: "EerCXtzaCPE",
      title: "A Newcomer's Guide to Nostr with Tanja Bachle",
      description: "At the third Nostrdam event in Amsterdam at Braai, event manager, author, and a new voice in the Nostr community Tanja Bachle shares her personal journey of discovering Nostr and Bitcoin! She offers a fresh perspective from someone not deeply rooted in tech but passionately driven by freedom of speech and decentralization. From overcoming personal challenges to embracing the world of decentralized social networks, her story is one of inspiration and resilience. Whether you're a Nostr veteran or newcomer, this episode is packed with insights on building a decentralized future.\n\nHere are some highlights:\n🔸 From property management to the world of Nostr and Bitcoin.\n🔸 Her experience in overcoming a burnout and finding a new purpose through Bitcoin and decentralization.\n🔸 The challenges and excitement of learning Nostr as a non-technical person.\n🔸 The importance of freedom of speech and securing personal data in a decentralized way.\n🔸 Insights into the Nostr community and how it supports newcomers.\n🔸 Tanja’s vision for promoting Nostr, including a tour to South America to drive adoption.\n\nA big thank you to Tanja for sharing her time and expertise with everyone on the Nostr journey! 🙌🌟",
      channelId: "UC-9-kyTW8ZkZNDHQJ6FgpwQ",
      channelName: "Nostr Community Channel",
    },
  ];
  </script>
  
  <style scoped>
  /* Tailwind CSS is used for styling, no custom styles needed here */
  </style>
  