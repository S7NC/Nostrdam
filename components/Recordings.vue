<template>
  <div class="max-w-7xl mx-auto p-6 text-center mt-10">
    <h1 class="text-3xl font-bold mb-8">Video Content</h1>

    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="video in videos" :key="video.id" class="text-left">
        <h4 class="text-lg font-semibold mb-2 truncate">{{ video.title }}</h4>
        <div class="relative w-full" style="padding-bottom: 56.25%;"> <!-- Maintain 16:9 aspect ratio -->
          <iframe
            :src="`https://www.youtube.com/embed/${video.videoId}`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
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
      channelId: "UC-9-kyTW8ZkZNDHQJ6FgpwQ",
      channelName: "Nostr Community Channel",
    },
    {
      id: 2,
      videoId: "zDQUqF-OWno",
      title: "Will Casarin - The Future of Damus",
      channelId: "UC-9-kyTW8ZkZNDHQJ6FgpwQ",
      channelName: "Nostr Community Channel",
    },
    {
      id: 3,
      videoId: "AcsL5eSkeIw",
      title: "Onboarding the World: Nostr's Path to Mass Adoption",
      channelId: "UC-9-kyTW8ZkZNDHQJ6FgpwQ",
      channelName: "Nostr Community Channel",
    },
    {
      id: 4,
      videoId: "dU0mNRiA06g",
      title: "Wouter Constant - Nostr Special Forces - Nostrdam",
      channelId: "UC-9-kyTW8ZkZNDHQJ6FgpwQ",
      channelName: "Nostr Community Channel",
    },
  ];
  </script>
  
  <style scoped>
  /* Tailwind CSS is used for styling, no custom styles needed here */
  </style>
  