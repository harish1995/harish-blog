import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import type { ContactData } from '../../types'

const defaultData: ContactData = {
  heading: "Let's Build Something",
  subtext: 'Open to fullstack roles, freelance projects, and collaborations.',
  email: '',
  location: '',
  availability: '',
  socials: [],
}

export default function ContactEditor() {
  const [data, setData] = useState<ContactData>(defaultData)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getDoc(doc(db, 'portfolio', 'contact')).then((snap) => {
      if (snap.exists()) setData(snap.data() as ContactData)
    })
  }, [])

  async function handleSave() {
    setSaving(true)
    await setDoc(doc(db, 'portfolio', 'contact'), data)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function updateSocial(i: number, field: string, val: string) {
    setData((d) => ({ ...d, socials: d.socials.map((s, idx) => idx === i ? { ...s, [field]: val } : s) }))
  }

  return (
    <div className="editor">
      <h2>Contact Section</h2>

      <div className="form-group">
        <label>Heading</label>
        <input value={data.heading} onChange={(e) => setData((d) => ({ ...d, heading: e.target.value }))} placeholder="Let's Build Something" />
      </div>

      <div className="form-group">
        <label>Sub-text</label>
        <textarea rows={2} value={data.subtext} onChange={(e) => setData((d) => ({ ...d, subtext: e.target.value }))} placeholder="Open to roles, freelance..." />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={data.email} onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))} placeholder="you@email.com" />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input value={data.location} onChange={(e) => setData((d) => ({ ...d, location: e.target.value }))} placeholder="India · Open to Remote" />
        </div>
      </div>

      <div className="form-group">
        <label>Availability</label>
        <input value={data.availability} onChange={(e) => setData((d) => ({ ...d, availability: e.target.value }))} placeholder="Available from May 2026" />
      </div>

      <h3>Social Links</h3>
      <div className="form-group">
        {data.socials.map((s, i) => (
          <div key={i} className="array-row">
            <input value={s.icon} onChange={(e) => updateSocial(i, 'icon', e.target.value)} placeholder="🐙" style={{ maxWidth: 52 }} />
            <input value={s.label} onChange={(e) => updateSocial(i, 'label', e.target.value)} placeholder="GitHub" />
            <input value={s.href} onChange={(e) => updateSocial(i, 'href', e.target.value)} placeholder="https://..." style={{ flex: 2 }} />
            <button className="btn-remove" onClick={() => setData((d) => ({ ...d, socials: d.socials.filter((_, idx) => idx !== i) }))}>✕</button>
          </div>
        ))}
        <button className="btn-add" onClick={() => setData((d) => ({ ...d, socials: [...d.socials, { icon: '', label: '', href: '#' }] }))}>+ Add Social</button>
      </div>

      <button className="btn-save" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      {saved && <span className="save-status">Saved ✓</span>}
    </div>
  )
}
