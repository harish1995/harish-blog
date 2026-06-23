import { useState, FormEvent, useRef } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
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
          <h3>Let's Build Something</h3>
          <p>Open to fullstack roles, freelance projects, and collaborations. Feel free to reach out — I usually reply within 24 hours.</p>
          <div className="contact-items">
            <div className="contact-item">
              <div className="contact-item-icon">✉️</div>
              <span>harihartech@gmail.com</span>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <span>India · Open to Remote</span>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">💼</div>
              <span>Available from May 2026</span>
            </div>
          </div>
        </div>

        <div className="glass contact-form-card">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>NAME</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>EMAIL</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label>SUBJECT</label>
              <input type="text" placeholder="Project inquiry, job offer..." />
            </div>
            <div className="form-group">
              <label>MESSAGE</label>
              <textarea rows={4} placeholder="Tell me about your project or opportunity..." required />
            </div>
            <button type="submit" className={`btn-submit${sent ? ' sent' : ''}`}>
              {sent ? 'Message Sent! ✓' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>

      <div className="social-row">
        <a href="#" className="social-card">🐙 GitHub</a>
        <a href="#" className="social-card">💼 LinkedIn</a>
        <a href="#" className="social-card">🐦 Twitter</a>
        <a href="#" className="social-card">📄 Resume</a>
      </div>
    </section>
  )
}
