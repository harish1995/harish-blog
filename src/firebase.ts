import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCbKu-qSHAfJEZZLnihhvMO_8KZAEUb9YE",
  authDomain: "harish-blog.firebaseapp.com",
  projectId: "harish-blog",
  storageBucket: "harish-blog.firebasestorage.app",
  messagingSenderId: "866596821950",
  appId: "1:866596821950:web:74eff6f4151e7ba74d37ef",
  measurementId: "G-XHP267R0NW",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
