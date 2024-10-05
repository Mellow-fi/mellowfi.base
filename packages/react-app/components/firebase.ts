import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC91PZXVNzZJiIHZumpBNk4rAJmz813tA4",
  authDomain: "mellow-finance-471ba.firebaseapp.com",
  projectId: "mellow-finance-471ba",
  storageBucket: "mellow-finance-471ba.appspot.com",
  messagingSenderId: "983849158164",
  appId: "1:983849158164:web:5111ff07f35adb01fd4901",
  measurementId: "G-KQNKPLYGH4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
