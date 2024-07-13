const functions = require('firebase-functions'); // Import Firebase Functions
const admin = require('firebase-admin'); // Import Firebase Admin SDK
admin.initializeApp(); // Initialize the Firebase Admin SDK

/**
 * Callable function to add the teacher role to a user.
 * This function checks if the requester is an admin before adding the teacher role.
 * @param {Object} data - Data passed to the function (should include email).
 * @param {Object} context - Authentication context of the request.
 * @returns {Object} - A success message or error message.
 * Author: Tom Wang
 */
exports.addTeacherRole = functions.https.onCall((data, context) => {
  if (context.auth.token.role !== 'admin') {
    return { error: 'Only admins can add teacher roles' };
  }

  return admin.auth().getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, { role: 'teacher' });
    })
    .then(() => {
      return { message: `Success! ${data.email} has been granted the teacher role.` };
    })
    .catch(err => {
      return { error: err.message };
    });
});

/**
 * Example HTTP function to respond with "Hello from Firebase!".
 * @param {Object} request - HTTP request object.
 * @param {Object} response - HTTP response object.
 * Author: Tom Wang
 */
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
