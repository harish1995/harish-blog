import { useState, useEffect } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase'
import Login from './Login'
import Dashboard from './Dashboard'
import './admin.css'

export default function AdminApp() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="admin-loading">Loading...</div>
  if (!user) return <Login />
  return <Dashboard user={user} />
}
