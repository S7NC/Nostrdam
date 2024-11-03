<template>
  
  <div class="profiles-container mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
    <div v-for="(profile, index) in profiles" :key="index" class="profile-wrapper">
      <div class="profile mx-auto bg-white shadow-lg rounded-lg p-6 w-full h-full flex flex-col items-center justify-start">
        <div v-if="profile.eventData">
          <img
            :src="getProfileImage(profile.npub)"
            alt="Profile Picture"
            class="mb-4 w-32 h-32 rounded-full border-4 border-gray-300 mx-auto"
          />
          <h2 class="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            {{ profile.eventData.name || 'Anonymous' }}
          </h2>
          <p class="text-gray-600 mt-2">
            {{ profile.eventData.about || 'No description available.' }}
          </p>
          <div v-if="profile.eventData.website" class="mt-4">
            <a :href="profile.eventData.website" target="_blank" class="text-blue-500 hover:underline">
              {{ profile.eventData.website }}
            </a>
          </div>
        </div>
        <div v-else class="text-center h-1/2 my-24">
          <svg
            class="animate-spin h-8 w-8 text-gray-500 dark:text-gray-300 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p class="mt-2 text-gray-500 dark:text-gray-300">Loading Profile...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import setup from "~/config/setup";
import NDK from "@nostr-dev-kit/ndk";
import { bech32 } from "bech32";

const npubs = [
  "npub1qg5a5l3t7pakmm4r4up2e764xecsw62fk3rntevm24fwyczhndtsdrvc4x",
  "npub1vvqnak4hz0u7vkv0vs5jp4ha0dt359cgvz4jj4y2ku85z0dtt6zq9pv3s8",
  "npub1equrmqway3qxw3dkssymusxkwgwrqypfgeqx0lx9pgjam7gnj4ysaqhkj6"
];

const profiles = ref(
  npubs.map((npub) => ({ npub, eventData: null }))
);

const bytesToHex = (bytes) => {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const npubToHex = (npub) => {
  const decoded = bech32.decode(npub);
  const pubkeyBytes = bech32.fromWords(decoded.words);
  return bytesToHex(Uint8Array.from(pubkeyBytes));
};

const getProfileImage = (npub) => {
  const images = {
    "npub1qg5a5l3t7pakmm4r4up2e764xecsw62fk3rntevm24fwyczhndtsdrvc4x": "https://media.nostr.band/thumbs/9b57/0229da7e2bf07b6deea3af02acfb553671076949b44735e59b5552e260579b57-picture-64",
    "npub1vvqnak4hz0u7vkv0vs5jp4ha0dt359cgvz4jj4y2ku85z0dtt6zq9pv3s8": "https://media.nostr.band/thumbs/5e84/63013edab713f9e6598f642920d6fd7b571a170860ab29548ab70f413dab5e84-picture-64",
    "npub1equrmqway3qxw3dkssymusxkwgwrqypfgeqx0lx9pgjam7gnj4ysaqhkj6": "https://pfp.nostr.build/637221b41f21e6d5126cb44e6172cf8600cb1fc1953461de03d80ce983845953.gif",
  };
  return images[npub] || "https://via.placeholder.com/150";
};

onMounted(async () => {
  const ndk = new NDK({ explicitRelayUrls: setup.relays });

  await ndk.connect();

  for (let profile of profiles.value) {
    const skHex = npubToHex(profile.npub);
    const filter = { kinds: [0], authors: [skHex] };

    const event = await ndk.fetchEvent(filter);
    // console.log(event)
    if (event && event.content) {
      try {
        profile.eventData = JSON.parse(event.content);
      } catch (error) {
        console.error("Error parsing event data:", error);
        profile.eventData = null;
      }
    } else {
      profile.eventData = null;
    }
  }
});
</script>

<style scoped>
.profile-wrapper {
  max-width: 400px;
  margin: 0 auto;
  position: relative;
}

.profiles-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  text-align: center;
}

.profile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>

<i18n lang="json">
  {
    "da": {},
    "de": {},
    "en": {},
    "es": {},
    "fr": {},
    "nl": {},
    "pt": {}
  }
  </i18n>