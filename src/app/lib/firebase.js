// app/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// ✅ Your Firebase config (keep yours)
const firebaseConfig = {
  apiKey: "AIzaSyC4MR-2nkHdsK-WVGZ1oIThLREsrYxnXZw",
  authDomain: "palestine-donation.firebaseapp.com",
  databaseURL: "https://palestine-donation-default-rtdb.firebaseio.com",
  projectId: "palestine-donation",
  storageBucket: "palestine-donation.firebasestorage.app",
  messagingSenderId: "283586573273",
  appId: "1:283586573273:web:4908eddd6f5b834a05dfc8",
  measurementId: "G-B3D4G2YFLY"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Realtime Database
export const db = getDatabase(app);
