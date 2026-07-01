import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import type { HeroData } from '../../types'
import ImageUpload from '../components/ImageUpload'

const defaultData: HeroData = {
  badge: 'Available for opportunities',
  name: "Hi, I'm",
  nameAccent: 'Harish K.',
  subtitle: 'Fullstack Developer · Java Backend + React Frontend',
  description: '',
  imageUrl: '',
  stats: [
    { value: '3+', label: 'Years Exp' },
    { value: '20+', label: 'Projects' },
    { value: '10+', label: 'Clients' },
  ],
}

export default function HeroEditor() {
  const [data, setData] = useState<HeroData>(defaultData)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getDoc(doc(db, 'portfolio', 'hero')).then((snap) => {
      if (snap.exists()) setData(snap.data() as HeroData)
    })
  }, [])

  async function handleSave() {
    setSaving(true)
    await setDoc(doc(db, 'portfolio', 'hero'), data)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function updateStat(i: number, field: 'value' | 'label', val: string) {
    setData((d) => ({ ...d, stats: d.stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s) }))
  }

  return (
    <div className="editor">
      <h2>Hero Section</h2>

      <div className="form-group">
        <label>Badge Text</label>
        <input value={data.badge} onChange={(e) => setData((d) => ({ ...d, badge: e.target.value }))} placeholder="Available for opportunities" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Name Prefix</label>
          <input value={data.name} onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))} placeholder="Hi, I'm" />
        </div>
        <div className="form-group">
          <label>Name (accent colour)</label>
          <input value={data.nameAccent} onChange={(e) => setData((d) => ({ ...d, nameAccent: e.target.value }))} placeholder="Harish K." />
        </div>
      </div>

      <div className="form-group">
        <label>Subtitle</label>
        <input value={data.subtitle} onChange={(e) => setData((d) => ({ ...d, subtitle: e.target.value }))} placeholder="Fullstack Developer · ..." />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea rows={3} value={data.description} onChange={(e) => setData((d) => ({ ...d, description: e.target.value }))} placeholder="Short bio paragraph..." />
      </div>

      <div className="form-group">
        <label>Profile Photo</label>
        <ImageUpload
          currentUrl={data.imageUrl}
          onUploaded={(url) => setData((d) => ({ ...d, imageUrl: url }))}
        />
      </div>

      <div className="form-group">
        <label>Stats</label>
        {data.stats.map((s, i) => (
          <div key={i} className="array-row">
            <input value={s.value} onChange={(e) => updateStat(i, 'value', e.target.value)} placeholder="3+" style={{ maxWidth: 80 }} />
            <input value={s.label} onChange={(e) => updateStat(i, 'label', e.target.value)} placeholder="Years Exp" />
            <button className="btn-remove" onClick={() => setData((d) => ({ ...d, stats: d.stats.filter((_, idx) => idx !== i) }))}>✕</button>
          </div>
        ))}
        <button className="btn-add" onClick={() => setData((d) => ({ ...d, stats: [...d.stats, { value: '', label: '' }] }))}>+ Add Stat</button>
      </div>

      <button className="btn-save" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      {saved && <span className="save-status">Saved ✓</span>}
    </div>
  )
}
