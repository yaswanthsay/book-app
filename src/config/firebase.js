import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"



const firebaseConfig = {
  apiKey: "AIzaSyCbAEPpwGboyE_aUARE10qIG5TjJwQH-ps",
  authDomain: "green-app-ccb55.firebaseapp.com",
  projectId: "green-app-ccb55",
  storageBucket: "green-app-ccb55.appspot.com",
  messagingSenderId: "139879281166",
  appId: "1:139879281166:web:ed96f1b7f175872c5a825f",
  measurementId: "G-8ZTPSW8EKM"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
