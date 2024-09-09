<script setup>

import { ref, onMounted, watch } from "vue";
import setup from "~/config/setup";
import NDK from "@nostr-dev-kit/ndk";
import {bech32} from "bech32";

const fetchedCalendarEvent = ref('');
const metadata = ref({});
const ndk = new NDK({explicitRelayUrls: ['wss://relay.nostr.band']});
const RSVPs = ref();
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

onMounted(async () => {
  await ndk.connect();

  // This is the created event with the Nostrdam calendar event:
  // - naddr1qqyrwery893rgde3qgst6vhqwfggcadhmxu32a0hce94e7sqcjpkylvkv34h8uu29qgsw0srqsqqql9nrar3m8
  // - https://njump.me/naddr1qqyrwery893rgde3qgst6vhqwfggcadhmxu32a0hce94e7sqcjpkylvkv34h8uu29qgsw0srqsqqql9nrar3m8

  // This is the calendar event of Bitcoin Amsterdam (npub13e6qu4kdjsyysrfl5an558rawvqg0rx2xuat9ca706spcdqjzhuqq6md43):
  // -
  // -

  const filter = {
    kinds: [31923],
    authors: [npubToHex(setup.nostradmin)]
    //authors: [npubToHex('npub13e6qu4kdjsyysrfl5an558rawvqg0rx2xuat9ca706spcdqjzhuqq6md43')]
  };
  fetchedCalendarEvent.value = await ndk.fetchEvent(filter);
  //fetchedCalendarEvent.value = fetchedCalendarEvent.value.rawEvent();
  if (fetchedCalendarEvent.value) {
    console.log(fetchedCalendarEvent.value)
    setMetaData();
    await getRSVPs();
  }
});

const setMetaData = () => {
  const tags = fetchedCalendarEvent.value.tags;
  tags.forEach( (tag) => {
    // Title of the event
    if (tag[0] === 'title') {
     metadata.value = {...metadata.value, 'title': tag[1]};
    }
    // Dates of the event (start and end)
    if (tag[0] === 'start') {
      metadata.value = {...metadata.value, 'start': tag[1]};
    }
    if (tag[0] === 'end') {
      metadata.value = {...metadata.value, 'end': tag[1]};
    }
    // Location
    if (tag[0] === 'location') {
      metadata.value = {...metadata.value, 'location': tag[3]};
    }
    // d-tag
    if (tag[0] === 'd') {
      metadata.value = {...metadata.value, 'd': tag[1]};
    }
    // timezone
    if (tag[0] === 'start_tzid') {
      metadata.value = {...metadata.value, 'start_tzid': tag[1]};
    }
  });
}

// https://github.com/nostr-protocol/nips/blob/master/52.md#calendar-event-rsvp
const RSVP = (calendarEvent) => {
  console.log('Connect your Nostr and sign an RSVP event.')
}

const toDate = (timestamp) => {
  let string = new Date(timestamp * 1000).toLocaleString("en-US");
  return string;
}

// Get RSVP events to the calendarEvent
// https://github.com/nostr-protocol/nips/blob/master/52.md#calendar-event-rsvp
const getRSVPs = async (calendarEvent) => {
  await ndk.connect();
  const filter = {
    kinds: [31925],
    ['#a']: ['31923:'+fetchedCalendarEvent.value.rawEvent().pubkey+':'+metadata.value.d],
    limit: 750
  };
  // TODO filter out duplicate pubkeys..
  // TODO filter out status accepted
  const rsvp = await ndk.fetchEvents(filter);
  RSVPs.value = {'numberOfAttendees': rsvp.size};
}

</script>

<template>
  <div>
    <div v-if="fetchedCalendarEvent">
      <div class="text-center my-12">
        <h2 class="text-white text-6xl mb-4">{{ metadata.title }}</h2>
        <p>
          {{ metadata.description }}
        </p>
        <p>
          {{ toDate(metadata.start) }} - {{ toDate(metadata.end) }} ({{ metadata.start_tzid }})
          <br />
          Bar Braai, {{ metadata.location }}
          <br />
          <a href="https://btcmap.org/merchant/node:2808992711" target="_blank" class="text-sm underline">View on btcmap.org</a>
        </p>
        <button @click="RSVP(fetchedCalendarEvent)" class="btn-block bg-orange-500 hover:bg-orange-700 mt-4 my-2 p-2">Click here to RSVP</button>
        <p class="text-sm italic" v-if="RSVPs">
          <span>{{ RSVPs.numberOfAttendees }}</span> other nostriches are going
        </p>
      </div>
    </div>
    <div class="text-center my-24" v-else>
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
      ...loading calendar event...
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>