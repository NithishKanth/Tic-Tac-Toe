import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId:"tic-tac-toe-425307",
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export {database}
