import admin from 'firebase-admin';

require('dotenv').config();

const serviceAccount = JSON.parse(process.env.firebaseServiceAccount || '');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { db };
