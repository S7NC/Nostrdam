<template>
  <div class="mx-auto mt-10 relative">
    <div v-if="eventData" class="relative z-10 text-center">
      <div class="flex justify-center">
        <img :src="eventData.picture || ''" alt="Profile Picture" class="mt-48 mb-12 w-32 h-32 rounded-full border-4 border-white" />
      </div>
      <div class="w-full text-center bg-black/60 p-4">
        <h2 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl uppercase">8-9-10 OCT '24</h2>
         <p class="text-gray-200">Bitcoin Amsterdam '24</p>
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
      <p class="mt-2 text-gray-500 dark:text-gray-300">Loading Hero Profile...</p>
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
</script>
<i18n lang="json">
  {
    "da": {
      "line1": "Demo-legitimationsoplysninger opdaget!",
      "line2": "Skift LNaddress, btcaddress og orderwebhook i ",
      "line3": "en åben Discord-kanal",
      "line4": "og midler sendes til en Prism-tegnebog for bidragsydere.",
      "line5": "Du kan også tage et kig på",
      "line6": "tjeklisten",
      "line7": "dette er ting, du stadig bør mærke / tilpasse før du sætter i produktion.",
      "line8": "du kan se det aktuelle WIP lokale admin UI",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Sovereign Space",
      "proofOfWorkPudding": "Velkommen til vores digitale hjørne udforsk indhold og produkter",
      "buildBitcoinNostrDescription": "Byg Bitcoin & Nostr Ecosystem virksomheder og udnyt den bedste måde at farme bitcoin og stable sats! Leverer varer, tjenester og løsninger til bitcoin adoption og integration.",
      "viewProjectsButton": "Se Butik",
      "getStartedLink": "Begynd at læse"
    },
    "de": {
      "line1": "Demo-Zugangsdaten erkannt!",
      "line2": "Ändern Sie LNaddress, btcaddress und orderwebhook in der ",
      "line3": "einen offenen Discord-Kanal",
      "line4": "und Gelder werden an eine Prism-Wallet für Mitwirkende gesendet.",
      "line5": "Sie können auch einen Blick werfen auf",
      "line6": "die Checkliste",
      "line7": "das sind Dinge, die Sie noch kennzeichnen / anpassen sollten, bevor Sie in Produktion gehen.",
      "line8": "Sie können die aktuelle WIP lokale Admin-Oberfläche einsehen",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Sovereign Space",
      "proofOfWorkPudding": "Willkommen in unserer digitalen Ecke erkunden Sie Inhalte und Produkte",
      "buildBitcoinNostrDescription": "Bauen Sie Bitcoin & Nostr Ökosystem-Unternehmen und nutzen Sie den besten Weg, um Bitcoin zu farmen und Sats zu stapeln! Bereitstellung von Waren, Dienstleistungen und Lösungen für die Bitcoin-Adoption und Integration.",
      "viewProjectsButton": "Shop ansehen",
      "getStartedLink": "Beginnen Sie mit dem Lesen"
    },
    "es": {
      "line1": "¡Credenciales de demostración detectadas!",
      "line2": "Cambia LNaddress, btcaddress y orderwebhook en el archivo ",
      "line3": "un canal abierto de Discord",
      "line4": "y los fondos se envían a una billetera Prism para colaboradores.",
      "line5": "También puedes echar un vistazo a",
      "line6": "la lista de verificación",
      "line7": "estas son cosas que todavía deberías personalizar antes de poner en producción.",
      "line8": "puedes ver la UI de administración local WIP actual",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Espacio Soberano",
      "proofOfWorkPudding": "Bienvenido a nuestro rincón digital, explora contenido y productos",
      "buildBitcoinNostrDescription": "Construye negocios del ecosistema Bitcoin & Nostr y utiliza la mejor manera de farmear bitcoin y apilar sats! Ofreciendo bienes, servicios y soluciones para la adopción e integración de bitcoin.",
      "viewProjectsButton": "Ver Tienda",
      "getStartedLink": "Comenzar a leer"
    },
    "en": {
      "line1": "Demo Crendentials Detected!",
      "line2": "Change the LNaddress, btcaddress and orderwebhook in the ",
      "line3": "an open discord chanel",
      "line4": "and funds are send to a prism wallet for contributors.",
      "line5": "You can also have a look at",
      "line6": "the checklist ",
      "line7": "these are things you should still brand / customise before putting in production.",
      "line8": "you can view the current WIP local admin UI ",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Sovereign Space",
      "proofOfWorkPudding": "Welcome to our digital corner explore content and products",
      "buildBitcoinNostrDescription": "Build Bitcoin & Nostr Ecosystem Businesses and utilise the best way to farm bitcoin and stack sats! Providing goods, services and solutions for bitcoin adoption and integrations.",
      "viewProjectsButton": "View Shop",
      "getStartedLink": "Start Reading "
    },
    "fr": {
      "line1": "Identifiants de démo détectés !",
      "line2": "Changez LNaddress, btcaddress et orderwebhook dans le fichier ",
      "line3": "un canal Discord ouvert",
      "line4": "et les fonds sont envoyés à un portefeuille Prism pour les contributeurs.",
      "line5": "Vous pouvez également jeter un œil à",
      "line6": "la liste de contrôle",
      "line7": "ce sont des choses que vous devriez encore personnaliser avant de mettre en production.",
      "line8": "vous pouvez consulter l'interface administrateur locale WIP actuelle",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Espace Souverain",
      "proofOfWorkPudding": "Bienvenue dans notre coin numérique, explorez le contenu et les produits",
      "buildBitcoinNostrDescription": "Construisez des entreprises de l'écosystème Bitcoin & Nostr et utilisez la meilleure façon de farmer des bitcoins et d'empiler des sats! Fournissant des biens, des services et des solutions pour l'adoption et l'intégration du bitcoin.",
      "viewProjectsButton": "Voir la Boutique",
      "getStartedLink": "Commencer à lire"
    },
    "nl": {
      "line1": "Demo-credentials gedetecteerd!",
      "line2": "Wijzig LNaddress, btcaddress en orderwebhook in het ",
      "line3": "een open Discord-kanaal",
      "line4": "en fondsen worden verzonden naar een Prism-portemonnee voor bijdragers.",
      "line5": "Je kunt ook kijken naar",
      "line6": "de checklist",
      "line7": "dit zijn dingen die je nog moet brandmerken / aanpassen voordat je in productie gaat.",
      "line8": "u kunt de huidige WIP lokale admin UI bekijken",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Soevereine Ruimte",
      "proofOfWorkPudding": "Welkom in onze digitale hoek, verken inhoud en producten",
      "buildBitcoinNostrDescription": "Bouw Bitcoin & Nostr Ecosysteem Bedrijven en gebruik de beste manier om bitcoin te farmen en sats te stapelen! Het leveren van goederen, diensten en oplossingen voor bitcoin adoptie en integratie.",
      "viewProjectsButton": "Bekijk Winkel",
      "getStartedLink": "Begin met lezen"
    },
    "pt": {
      "line1": "Credenciais de demonstração detectadas!",
      "line2": "Altere o LNaddress, btcaddress e orderwebhook no ",
      "line3": "um canal aberto do Discord",
      "line4": "e os fundos são enviados para uma carteira Prism para colaboradores.",
      "line5": "Você também pode dar uma olhada na",
      "line6": "lista de verificação",
      "line7": "estas são coisas que você ainda deve personalizar antes de colocar em produção.",
      "line8": "você pode ver a interface de administração local WIP atual",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Espaço Soberano",
      "proofOfWorkPudding": "Bem-vindo ao nosso canto digital, explore conteúdo e produtos",
      "buildBitcoinNostrDescription": "Construa negócios do ecossistema Bitcoin & Nostr e utilize a melhor maneira de minerar bitcoin e acumular sats! Fornecendo bens, serviços e soluções para a adoção e integração do bitcoin.",
      "viewProjectsButton": "Ver Loja",
      "getStartedLink": "Comece a Ler"
    }
  }
  </i18n>
  