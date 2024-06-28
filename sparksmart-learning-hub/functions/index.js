const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// remove
// const { onRequest } = require("firebase-functions/v2/https");
// const { logger } = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
