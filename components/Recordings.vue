<template>
  <div class="max-w-7xl mx-auto p-6 text-center mt-10">
    <h1 class="text-3xl font-bold mb-8">Event Video Archive</h1>

    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      <div v-for="video in videos" :key="video.id" class="text-left">
        <h4 class="text-lg font-semibold mb-2 truncate">{{ video.title }}</h4>
        <div class="relative w-full" style="padding-bottom: 56.25%;"> <!-- Maintain 16:9 aspect ratio -->
          <iframe
            :src="`https://www.youtube.com/embed/${video.videoId}`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          ></iframe>
        </div>
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
    {
      id: 2,
      videoId: "zDQUqF-OWno",
      title: "Will Casarin - The Future of Damus",
      description: "At the third Nostrdam event in Amsterdam at Braai, event manager, author, and a new voice in the Nostr community Tanja Bachle shares her personal journey of discovering Nostr and Bitcoin! She offers a fresh perspective from someone not deeply rooted in tech but passionately driven by freedom of speech and decentralization. From overcoming personal challenges to embracing the world of decentralized social networks, her story is one of inspiration and resilience. Whether you're a Nostr veteran or newcomer, this episode is packed with insights on building a decentralized future.\n\nHere are some highlights:\n🔸 From property management to the world of Nostr and Bitcoin.\n🔸 Her experience in overcoming a burnout and finding a new purpose through Bitcoin and decentralization.\n🔸 The challenges and excitement of learning Nostr as a non-technical person.\n🔸 The importance of freedom of speech and securing personal data in a decentralized way.\n🔸 Insights into the Nostr community and how it supports newcomers.\n🔸 Tanja’s vision for promoting Nostr, including a tour to South America to drive adoption.\n\nA big thank you to Tanja for sharing her time and expertise with everyone on the Nostr journey! 🙌🌟",
      channelId: "UC-9-kyTW8ZkZNDHQJ6FgpwQ",
      channelName: "Nostr Community Channel",
    },
    {
      id: 3,
      videoId: "AcsL5eSkeIw",
      title: "Onboarding the World: Nostr's Path to Mass Adoption",
      description: "At the third Nostrdam event in Amsterdam at Braai, event manager, author, and a new voice in the Nostr community Tanja Bachle shares her personal journey of discovering Nostr and Bitcoin! She offers a fresh perspective from someone not deeply rooted in tech but passionately driven by freedom of speech and decentralization. From overcoming personal challenges to embracing the world of decentralized social networks, her story is one of inspiration and resilience. Whether you're a Nostr veteran or newcomer, this episode is packed with insights on building a decentralized future.\n\nHere are some highlights:\n🔸 From property management to the world of Nostr and Bitcoin.\n🔸 Her experience in overcoming a burnout and finding a new purpose through Bitcoin and decentralization.\n🔸 The challenges and excitement of learning Nostr as a non-technical person.\n🔸 The importance of freedom of speech and securing personal data in a decentralized way.\n🔸 Insights into the Nostr community and how it supports newcomers.\n🔸 Tanja’s vision for promoting Nostr, including a tour to South America to drive adoption.\n\nA big thank you to Tanja for sharing her time and expertise with everyone on the Nostr journey! 🙌🌟",
      channelId: "UC-9-kyTW8ZkZNDHQJ6FgpwQ",
      channelName: "Nostr Community Channel",
    },
    {
      id: 4,
      videoId: "dU0mNRiA06g",
      title: "Wouter Constant - Nostr Special Forces - Nostrdam",
      description: "At the third Nostrdam event in Amsterdam at Braai, event manager, author, and a new voice in the Nostr community Tanja Bachle shares her personal journey of discovering Nostr and Bitcoin! She offers a fresh perspective from someone not deeply rooted in tech but passionately driven by freedom of speech and decentralization. From overcoming personal challenges to embracing the world of decentralized social networks, her story is one of inspiration and resilience. Whether you're a Nostr veteran or newcomer, this episode is packed with insights on building a decentralized future.\n\nHere are some highlights:\n🔸 From property management to the world of Nostr and Bitcoin.\n🔸 Her experience in overcoming a burnout and finding a new purpose through Bitcoin and decentralization.\n🔸 The challenges and excitement of learning Nostr as a non-technical person.\n🔸 The importance of freedom of speech and securing personal data in a decentralized way.\n🔸 Insights into the Nostr community and how it supports newcomers.\n🔸 Tanja’s vision for promoting Nostr, including a tour to South America to drive adoption.\n\nA big thank you to Tanja for sharing her time and expertise with everyone on the Nostr journey! 🙌🌟",
      channelId: "UC-9-kyTW8ZkZNDHQJ6FgpwQ",
      channelName: "Nostr Community Channel",
    },
  ];
  </script>
  
  <style scoped>
  /* Tailwind CSS is used for styling, no custom styles needed here */
  </style>
  