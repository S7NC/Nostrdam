<script setup>
import data from "~/config/setup";

import NDK from "@nostr-dev-kit/ndk";
import { bech32 } from "bech32";

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

const skHex = npubToHex(data.nostradmin);

const fetchedEvent = ref('');

onMounted(async () => {
  const ndk = new NDK({ explicitRelayUrls: data.relays });

  await ndk.connect();

  const filter = { kinds: [0], authors: [skHex] };

  const event = await ndk.fetchEvent(filter);

  if (event && event.content) {
    fetchedEvent.value = event.content;
  } else {
    fetchedEvent.value = 'No event content found';
  }

  // console.log(fetchedEvent.value);
});

const eventData = ref(null);

watch(fetchedEvent, (newVal) => {
  if (newVal) {
    try {
      eventData.value = JSON.parse(newVal);
    } catch (error) {
      console.error('Error parsing event data:', error);
      eventData.value = null;
    }
  }
});

const currentDate = new Date();
</script>
<template>
  <footer
    class="bg-colorBgLight dark:bg-colorBgDark border-t-4"
    aria-labelledby="footer-heading"
  >
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl px-3 pb-8 pt-12 lg:px-8">
      <!-- <div class="xl:grid xl:grid-cols-3 xl:gap-8"> -->
        <div> 
        <div class="text-center">

          <span
            v-if="eventData"
            class="mt-1.5 ml-4 text-2xl font-bold dark:text-white uppercase"
            >{{ eventData.name }}</span
          >

          <div class="flex flex-row justify-center my-3">
            <SettingsTheme />
            <SettingsLanguage v-if="data.multilang" />
          </div>
        </div>

      </div>

      <FundsTicker />

      <div
        class="mx-auto max-w-7xl px-6 py-2 md:flex md:items-center md:justify-between lg:px-8"
      >
        <div class="flex w-full justify-center space-x-6 md:order-2">
          <p
            class="text-xs leading-5 text-black dark:text-black dark:text-white mt-1"
          >
            {{ currentDate.getFullYear() }} {{ data.name }} All
            rights free.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
