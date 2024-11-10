export default defineEventHandler(() => {
  return {
      "status": "OK",
      "tag": "payRequest",
      "commentAllowed": 255,
      "callback": "https://getalby.com/lnurlp/zapnostrdam/callback",
      "metadata": "[[\"text/identifier\", \"zapnostrdam@getalby.com\"], [\"text/plain\", \"Sats for Nostrdam\"]]",
      "minSendable": 1000,
      "maxSendable": 11000000000,
      "payerData": {
          "name": {
          "mandatory": false
          },
          "email": {
          "mandatory": false
          }
      },
      "allowsNostr":true
  };
});
