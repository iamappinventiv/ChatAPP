const admin = require('firebase-admin');
const serviceAccount = require('./android/app/google-services.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

module.exports = {
  firestore, // You can export Firestore to use it in other parts of your application
};
