import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, addDoc, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import type { Job, Pill } from '../../types'

type DocItem = { id: string; data: Job }

const PILL_CLS = ['pill-java', 'pill-react', 'pill-green', 'pill-purple', 'pill-gray']

const blank: Omit<Job, 'order'> = { title: '', date: '', company: '', desc: '', techs: [], current: false }

export default function ExperienceEditor() {
  const [items, setItems] = useState<DocItem[]>([])
  const [editingId, setEditingId] = useState<string | 'new' | null>(null)
  const [form, setForm] = useState<Omit<Job, 'order'>>(blank)
  const [saving, setSaving] = useState(false)

  async function load() {
    const snap = await getDocs(query(collection(db, 'experience'), orderBy('order')))
    setItems(snap.docs.map((d) => ({ id: d.id, data: d.data() as Job })))
  }

  useEffect(() => { load() }, [])

  function startEdit(item: DocItem) { setEditingId(item.id); setForm({ ...item.data }) }
  function startNew() { setEditingId('new'); setForm({ ...blank }) }

  async function save() {
    setSaving(true)
    if (editingId === 'new') {
      await addDoc(collection(db, 'experience'), { ...form, order: items.length })
    } else {
      const existing = items.find((i) => i.id === editingId)!
      await setDoc(doc(db, 'experience', editingId!), { ...form, order: existing.data.order })
    }
    await load()
    setEditingId(null)
    setSaving(false)
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this experience entry?')) return
    await deleteDoc(doc(db, 'experience', id))
    await load()
  }

  function updateTech(i: number, field: keyof Pill, val: string) {
    setForm((f) => ({ ...f, techs: f.techs.map((t, idx) => idx === i ? { ...t, [field]: val } : t) }))
  }

  return (
    <div className="editor">
      <div className="header-row">
        <h2>Experience</h2>
        {editingId === null && (
          <button className="btn-save" style={{ margin: 0 }} onClick={startNew}>+ Add Job</button>
        )}
      </div>

      {editingId === null && (
        <ul className="item-list">
          {items.length === 0 && <li className="empty-state">No experience yet. Click + Add Job to start.</li>}
          {items.map((item) => (
            <li key={item.id} className="item-row">
              <div style={{ flex: 1 }}>
                <div className="item-row-title">
                  {item.data.title}
                  {item.data.current && <span style={{ marginLeft: 8, fontSize: '0.7rem', background: '#1e3a1e', color: '#38e2b8', padding: '0.1rem 0.45rem', borderRadius: 4 }}>Current</span>}
                </div>
                <div className="item-row-sub">{item.data.company} · {item.data.date}</div>
              </div>
              <button className="btn-edit" onClick={() => startEdit(item)}>Edit</button>
              <button className="btn-danger" onClick={() => remove(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {editingId !== null && (
        <div className="edit-form">
          <div className="edit-form-header">
            <h4>{editingId === 'new' ? 'New Job' : 'Edit Job'}</h4>
            <button className="btn-edit" onClick={() => setEditingId(null)}>Cancel</button>
          </div>

          <label className="checkbox-row">
            <input type="checkbox" checked={!!form.current} onChange={(e) => setForm((f) => ({ ...f, current: e.target.checked }))} />
            Mark as current position
          </label>

          <div className="form-row">
            <div className="form-group">
              <label>Job Title</label>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Senior Fullstack Developer" />
            </div>
            <div className="form-group">
              <label>Date Range</label>
              <input value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} placeholder="Jan 2024 – Present" />
            </div>
          </div>

          <div className="form-group">
            <label>Company</label>
            <input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="Acme Corp · Full-time" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea rows={4} value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} placeholder="What did you do here?" />
          </div>

          <div className="form-group">
            <label>Tech Pills</label>
            {form.techs.map((t, i) => (
              <div key={i} className="array-row">
                <input value={t.label} onChange={(e) => updateTech(i, 'label', e.target.value)} placeholder="Spring Boot" style={{ flex: 2 }} />
                <select value={t.cls} onChange={(e) => updateTech(i, 'cls', e.target.value)}>
                  {PILL_CLS.map((c) => <option key={c}>{c}</option>)}
                </select>
                <button className="btn-remove" onClick={() => setForm((f) => ({ ...f, techs: f.techs.filter((_, idx) => idx !== i) }))}>✕</button>
              </div>
            ))}
            <button className="btn-add" onClick={() => setForm((f) => ({ ...f, techs: [...f.techs, { label: '', cls: 'pill-java' }] }))}>+ Add Tech</button>
          </div>

          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? 'Saving...' : 'Save Job'}
          </button>
        </div>
      )}
    </div>
  )
}
