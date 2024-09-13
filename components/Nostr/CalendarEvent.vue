<script setup>

import { ref, onMounted } from "vue";
import setup from "~/config/setup";
import NDK, { NDKEvent, NDKNip07Signer } from "@nostr-dev-kit/ndk";
import {bech32} from "bech32";

const fetchedCalendarEvent = ref('');
const metadata = ref({});
const ndk = new NDK({explicitRelayUrls: setup.relays});
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
  };
  fetchedCalendarEvent.value = await ndk.fetchEvent(filter);
  if (fetchedCalendarEvent.value) {
    await setMetaData();
    await getRSVPs();
  }
  // TODO: check if user is connected and is already attending to the calender event.
  metadata.value = {...metadata.value, 'isAttending': false};
});

const setMetaData = async () => {
  const tags = fetchedCalendarEvent.value.tags;
  tags.forEach( (tag) => {
    // Title of the event
    if (tag[0] === 'title') {
     metadata.value = {...metadata.value, 'title': tag[1]};
    }
    // Startdate
    if (tag[0] === 'start') {
      metadata.value = {...metadata.value, 'start': tag[1]};
    }
    // Enddate
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
    // Timezone
    if (tag[0] === 'start_tzid') {
      metadata.value = {...metadata.value, 'start_tzid': tag[1]};
    }
    // Summary
    if (tag[0] === 'summary') {
      metadata.value = {...metadata.value, 'summary': tag[1]};
    }
    // Geohash
    if (tag[0] === 'g') {
      metadata.value = {...metadata.value, 'g': tag[1]};
    }
  });
  if (metadata.value.summary === undefined && fetchedCalendarEvent.value.content) {
    metadata.value.summary = fetchedCalendarEvent.value.content;
  }
}

// https://github.com/nostr-protocol/nips/blob/master/52.md#calendar-event-rsvp
const RSVPtoEvent = async (calendarEvent, status, event) => {
  try {
    // Find svg loading element in the button and remove hidden class.
    if (event.target.querySelector('svg') && event.target.querySelector('svg').classList.contains('hidden')) {
      event.target.querySelector('svg').classList.remove('hidden');
    }
    const nip07signer = new NDKNip07Signer();
    ndk.signer = nip07signer;
    await ndk.connect();
    const connectedUser = await nip07signer.user();
    // Check is user is already attending to the event.
    if(RSVPs.value && status === 'accepted' && RSVPs.value.pubkeys.includes(connectedUser.pubkey)){
      metadata.value.isAttending = true;
      return;
    }
    if(RSVPs.value && status === 'declined' && RSVPs.value.pubkeys.includes(connectedUser.pubkey)){
      let x  = RSVPs.value.pubkeys.indexOf(connectedUser.pubkey);
      RSVPs.value.pubkeys.splice(x, 1);
    }
    const RSVPevent = new NDKEvent(ndk);
    RSVPevent.kind = 31925;
    RSVPevent.tags = [
      ['e', calendarEvent.id, 'wss://relay.damus.io'],
      ['a', calendarEvent.kind+':'+calendarEvent.pubkey+':'+metadata.value.d],
      // Notice: the required d-tag is added when the event is signed.
      ['status', status],
      ['p', calendarEvent.pubkey, 'wss://relay.damus.io'],
      ['L', 'status'],
      ['l', status, 'status'],
      ['client', 'nostrdam.com', 'wss://relay.damus.io']
    ];
    RSVPevent.validate();
    await RSVPevent.sign(nip07signer);
    await RSVPevent.publish();
    metadata.value.isAttending = (status === 'accepted') || false;
    if (RSVPs.value) {
      (metadata.value.isAttending) ? RSVPs.value.numberOfAttendees++ : RSVPs.value.numberOfAttendees--;
    }
  } catch (e) {
    if (event.target.querySelector('svg') && !event.target.querySelector('svg').classList.contains('hidden')) {
      event.target.querySelector('svg').classList.add('hidden');
    }
    console.log(e);
  }
}

const toDateString = (timestamp) => {
  let stringDate = new Date(timestamp * 1000).toLocaleString("en-US");
  return stringDate;
}

// Get RSVP events of the calendarEvent.
// https://github.com/nostr-protocol/nips/blob/master/52.md#calendar-event-rsvp
const getRSVPs = async () => {
  try {
    await ndk.connect();
    const filter = {
      kinds: [31925],
      ['#a']: ['31923:'+fetchedCalendarEvent.value.rawEvent().pubkey+':'+metadata.value.d],
      ['#l']: ['accepted', 'status'],
      // Notice: labels are still common to use for RSVP event to set the status instead of the status tag as described in the NIP.
      //['#status]: ['accepted'],
    };
    const rsvp = await ndk.fetchEvents(filter);
    // Filter out duplicate pubkeys.
    RSVPs.value = {...RSVPs.value, pubkeys: []};
    for(const event of rsvp) {
      const pubkey = event.pubkey;
      RSVPs.value = {...RSVPs.value, pubkeys: [...RSVPs.value.pubkeys, pubkey]};
    }
    RSVPs.value.pubkeys = RSVPs.value.pubkeys.filter((item, index, array) => array.indexOf(item) === index);
    RSVPs.value = {...RSVPs.value, 'numberOfAttendees': RSVPs.value.pubkeys.length};
  } catch (e) {
    console.log(e);
  }
}

</script>

<template>
  <div>
    <div v-if="fetchedCalendarEvent">
      <div class="text-center my-12">
        <h2 class="text-white text-6xl mb-4">{{ metadata.title }}</h2>
        <p class="my-4">
          {{ metadata.summary }}
        </p>
        <p>
          {{ toDateString(metadata.start) }} - {{ toDateString(metadata.end) }} ({{ metadata.start_tzid }})
          <br />
          Bar Braai, {{ metadata.location }}
          <br />
          <a href="https://btcmap.org/merchant/node:2808992711" target="_blank" class="text-sm underline">View on btcmap.org</a>
        </p>
        <div class="mt-4 my-2" v-if="metadata.isAttending">
          <span class="text-green-400">You're attending this event</span>
          <br />
          <button class="text-sm underline" @click="RSVPtoEvent(fetchedCalendarEvent, 'declined', $event)">Click here to unattend</button>
        </div>
        <div class="mt-4 my-2" v-else>
          <button @click="RSVPtoEvent(fetchedCalendarEvent, 'accepted', $event)" class="inline-flex items-center rounded-md btn-block bg-orange-500 hover:bg-orange-700 p-2">
            <svg class="animate-spin hidden mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Click here to RSVP
          </button>
        </div>
        <div class="my-12">
          <a href="https://bitkassa.nl/nostrdam" target="_blank" class="p-4 bg-white bg-opacity-10">Please be aware you have to <span class="underline text-orange-400">buy a ticket</span></a>
        </div>
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