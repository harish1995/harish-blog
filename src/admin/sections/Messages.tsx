import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'

type Message = { id: string; name: string; email: string; subject: string; message: string; sentAt: string }

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const snap = await getDocs(query(collection(db, 'messages'), orderBy('sentAt', 'desc')))
    setMessages(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Message, 'id'>) })))
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function remove(id: string) {
    if (!window.confirm('Delete this message?')) return
    await deleteDoc(doc(db, 'messages', id))
    setMessages((m) => m.filter((msg) => msg.id !== id))
  }

  function formatDate(iso: string) {
    try { return new Date(iso).toLocaleString() } catch { return iso }
  }

  if (loading) return <div className="empty-state">Loading messages...</div>

  return (
    <div className="editor">
      <div className="header-row">
        <h2>Contact Messages</h2>
        <button className="btn-edit" onClick={load}>↻ Refresh</button>
      </div>

      {messages.length === 0 ? (
        <div className="empty-state">No messages yet. They'll appear here when visitors submit the contact form.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="messages-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Received</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id}>
                  <td>{msg.name}</td>
                  <td><a href={`mailto:${msg.email}`} style={{ color: '#4f9cf9', textDecoration: 'none' }}>{msg.email}</a></td>
                  <td>{msg.subject || '—'}</td>
                  <td style={{ maxWidth: 260 }}>{msg.message}</td>
                  <td style={{ whiteSpace: 'nowrap', color: '#555' }}>{formatDate(msg.sentAt)}</td>
                  <td><button className="btn-danger" onClick={() => remove(msg.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
