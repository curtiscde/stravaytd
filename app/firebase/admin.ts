import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

require('dotenv').config();

const serviceAccount = JSON.parse(process.env.firebaseServiceAccount || '');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export { db };
