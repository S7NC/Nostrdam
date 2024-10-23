<template>
  <div class="contact-container p-8 text-center max-w-4xl mx-auto mt-10 rounded-lg">
    <h1 class="contact-header text-3xl mb-4">{{ t('contact.header') }}</h1>

    <SettingsSocialslarge class="mx-auto"/>

    <p class="contact-text text-lg">
      {{ t('contact.text') }} <br>
      <a href="mailto:info@nostrdam.com" class="text-blue-500 hover:underline">
        info@nostrdam.com
      </a>
    </p>
  </div>
</template>

<script setup>
const { t } = useI18n({ useScope: "local" });
</script>

<i18n lang="json">
{
  "da": {
    "contact": {
      "header": "Kom i kontakt",
      "text": "Vil du tale ved Nostrdam '25 eller vil du bidrage? Kontakt os via nostr eller send en mail til"
    }
  },
  "de": {
    "contact": {
      "header": "Kontakt aufnehmen",
      "text": "Möchtest du auf der Nostrdam '25 sprechen oder beitragen? Kontaktiere uns über nostr oder sende eine Mail an"
    }
  },
  "en": {
    "contact": {
      "header": "Get in Touch",
      "text": "Do you want to talk at Nostrdam '25 or do you want to contribute? Reach out via nostr or send a mail to"
    }
  },
  "es": {
    "contact": {
      "header": "Ponerse en contacto",
      "text": "¿Quieres hablar en Nostrdam '25 o quieres contribuir? Contáctanos a través de nostr o envía un correo a"
    }
  },
  "fr": {
    "contact": {
      "header": "Prendre contact",
      "text": "Voulez-vous parler à Nostrdam '25 ou souhaitez-vous contribuer? Contactez-nous via nostr ou envoyez un mail à"
    }
  },
  "nl": {
    "contact": {
      "header": "Neem contact op",
      "text": "Wil je spreken op Nostrdam '25 of wil je bijdragen? Neem contact op via nostr of stuur een mail naar"
    }
  },
  "pt": {
    "contact": {
      "header": "Entre em contato",
      "text": "Você quer falar no Nostrdam '25 ou quer contribuir? Entre em contato via nostr ou envie um e-mail para"
    }
  }
}
</i18n>
