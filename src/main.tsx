import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { seedFirestore } from './seedFirestore'

// Call window.seedFirestore() in the browser console to populate Firestore with dummy data.
if (import.meta.env.DEV) {
  (window as unknown as { seedFirestore: typeof seedFirestore }).seedFirestore = seedFirestore
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
