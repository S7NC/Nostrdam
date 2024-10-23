<template>
  <div class="mx-auto mt-10 relative">
    <div v-if="eventData" class="relative z-10 text-center">
      <!-- <div class="flex justify-center">
        <img :src="eventData.picture || ''" alt="Profile Picture" class="mt-48 mb-12 w-32 h-32 rounded-full border-4 border-white" />
      </div> -->
      <div class="h-72"></div>
      <div class="w-full text-center bg-black/60 p-4">
        <h2 class="text-2xl font-semibold tracking-tight text-gray-900 text-white sm:text-4xl uppercase">{{ t('thank_you_message') }}</h2>
      
        <NuxtLink
          class="underline text-white"
          :to="localePath('/video')"
        >
        {{ t('missed_event_message') }}
        </NuxtLink>
      </div>
      <!-- <div v-if="eventData.website" class="mt-4">
        <a :href="eventData.website" target="_blank" class="text-blue-300">{{ eventData.website }}</a>
      </div> -->
    </div>
    <div v-if="eventData && eventData.banner" class="absolute top-0 left-0 w-full h-full z-0">
      <img :src="eventData.banner" alt="Banner" class="w-full h-full object-cover rounded-lg opacity-80" />
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
      <p class="mt-2 text-gray-500 dark:text-gray-300">{{ t('loading_message') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import setup from "~/config/setup";
import NDK from "@nostr-dev-kit/ndk";
import { bech32 } from "bech32";
const { t } = useI18n({ useScope: "local" });

const links = setup.socialnavigation;

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

const skHex = npubToHex(setup.nostradmin);

const fetchedEvent = ref('');

onMounted(async () => {
  const ndk = new NDK({ explicitRelayUrls: setup.relays });

  await ndk.connect();

  const filter = { kinds: [0], authors: [skHex] };

  const event = await ndk.fetchEvent(filter);

  if (event && event.content) {
    fetchedEvent.value = event.content;
  } else {
    fetchedEvent.value = 'No event content found';
  }

  console.log(fetchedEvent.value);
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
</script>
<i18n lang="json">
  {
    "da": {
      "thank_you_message": "Tak til alle for at deltage, vi ses næste år!",
      "missed_event_message": "Missede du begivenheden? Du kan se foredragene igen",
      "loading_message": "Indlæser helteprofil..."
    },
    "de": {
      "thank_you_message": "Vielen Dank an alle Teilnehmer, wir sehen uns nächstes Jahr!",
      "missed_event_message": "Haben Sie das Event verpasst? Sie können die Vorträge erneut anschauen",
      "loading_message": "Lade Heldenprofil..."
    },
    "en": {
      "thank_you_message": "Thank you all for attending, See you next year!",
      "missed_event_message": "Did you miss the Event? You can rewatch the talks",
      "loading_message": "Loading Hero Profile..."
    },
    "es": {
      "thank_you_message": "Gracias a todos por asistir, ¡nos vemos el próximo año!",
      "missed_event_message": "¿Te perdiste el evento? Puedes volver a ver las charlas",
      "loading_message": "Cargando perfil de héroe..."
    },
    "fr": {
      "thank_you_message": "Merci à tous d'avoir participé, à l'année prochaine!",
      "missed_event_message": "Vous avez manqué l'événement ? Vous pouvez revoir les conférences",
      "loading_message": "Chargement du profil du héros..."
    },
    "nl": {
      "thank_you_message": "Bedankt allemaal voor jullie aanwezigheid, tot volgend jaar!",
      "missed_event_message": "Heb je het evenement gemist? Je kunt de keynotes opnieuw bekijken",
      "loading_message": "Heldprofiel laden..."
    },
    "pt": {
      "thank_you_message": "Obrigado a todos pela presença, até o próximo ano!",
      "missed_event_message": "Você perdeu o evento? Você pode rever as palestras",
      "loading_message": "Carregando perfil do herói..."
    }
  }
  </i18n>
