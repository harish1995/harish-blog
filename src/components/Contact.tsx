import { useState, useEffect, FormEvent, useRef } from 'react'
import { doc, onSnapshot, addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import type { ContactData } from '../types'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [contact, setContact] = useState<ContactData | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    return onSnapshot(doc(db, 'portfolio', 'contact'), (snap) => {
      if (snap.exists()) setContact(snap.data() as ContactData)
    })
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    await addDoc(collection(db, 'messages'), { ...data, sentAt: new Date().toISOString() })
    setSent(true)
    formRef.current?.reset()
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section className="section" id="contact">
      <div className="section-header">
        <span className="section-num">04</span>
        <h2>Contact</h2>
        <div className="line"></div>
      </div>

      <div className="contact-grid">
        <div className="glass contact-info">
          <h3>{contact?.heading ?? "Let's Build Something"}</h3>
          <p>{contact?.subtext ?? 'Open to fullstack roles, freelance projects, and collaborations.'}</p>
          <div className="contact-items">
            <div className="contact-item">
              <div className="contact-item-icon">✉️</div>
              <span>{contact?.email ?? 'harihartech@gmail.com'}</span>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <span>{contact?.location ?? 'India · Open to Remote'}</span>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">💼</div>
              <span>{contact?.availability ?? 'Available from May 2026'}</span>
            </div>
          </div>
        </div>

        <div className="glass contact-form-card">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>NAME</label>
                <input name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>EMAIL</label>
                <input name="email" type="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label>SUBJECT</label>
              <input name="subject" type="text" placeholder="Project inquiry, job offer..." />
            </div>
            <div className="form-group">
              <label>MESSAGE</label>
              <textarea name="message" rows={4} placeholder="Tell me about your project or opportunity..." required />
            </div>
            <button type="submit" className={`btn-submit${sent ? ' sent' : ''}`}>
              {sent ? 'Message Sent! ✓' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>

      <div className="social-row">
        {(contact?.socials ?? [
          { icon: '🐙', label: 'GitHub', href: '#' },
          { icon: '💼', label: 'LinkedIn', href: '#' },
          { icon: '🐦', label: 'Twitter', href: '#' },
          { icon: '📄', label: 'Resume', href: '#' },
        ]).map((s) => (
          <a key={s.label} href={s.href} className="social-card">
            {s.icon} {s.label}
          </a>
        ))}
      </div>
    </section>
  )
}
