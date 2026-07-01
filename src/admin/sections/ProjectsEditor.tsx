import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, addDoc, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import type { Project, Pill } from '../../types'

type DocItem = { id: string; data: Project }

const CARD_CLASSES = ['card-full', 'card-java', 'card-react']
const ICON_CLASSES = ['icon-java', 'icon-react', 'icon-db', 'icon-tools']
const PILL_CLS = ['pill-java', 'pill-react', 'pill-green', 'pill-purple', 'pill-gray']

const blank: Omit<Project, 'order'> = {
  cardClass: 'card-react', iconClass: 'icon-react', icon: '🚀',
  title: '', desc: '', links: [], techs: [],
}

export default function ProjectsEditor() {
  const [items, setItems] = useState<DocItem[]>([])
  const [editingId, setEditingId] = useState<string | 'new' | null>(null)
  const [form, setForm] = useState<Omit<Project, 'order'>>(blank)
  const [saving, setSaving] = useState(false)

  async function load() {
    const snap = await getDocs(query(collection(db, 'projects'), orderBy('order')))
    setItems(snap.docs.map((d) => ({ id: d.id, data: d.data() as Project })))
  }

  useEffect(() => { load() }, [])

  function startEdit(item: DocItem) { setEditingId(item.id); setForm({ ...item.data }) }
  function startNew() { setEditingId('new'); setForm({ ...blank }) }
  function cancel() { setEditingId(null) }

  async function save() {
    setSaving(true)
    if (editingId === 'new') {
      await addDoc(collection(db, 'projects'), { ...form, order: items.length })
    } else {
      const existing = items.find((i) => i.id === editingId)!
      await setDoc(doc(db, 'projects', editingId!), { ...form, order: existing.data.order })
    }
    await load()
    setEditingId(null)
    setSaving(false)
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this project?')) return
    await deleteDoc(doc(db, 'projects', id))
    await load()
  }

  function updateTech(i: number, field: keyof Pill, val: string) {
    setForm((f) => ({ ...f, techs: f.techs.map((t, idx) => idx === i ? { ...t, [field]: val } : t) }))
  }
  function updateLink(i: number, field: string, val: string) {
    setForm((f) => ({ ...f, links: f.links.map((l, idx) => idx === i ? { ...l, [field]: val } : l) }))
  }

  return (
    <div className="editor">
      <div className="header-row">
        <h2>Projects</h2>
        {editingId === null && (
          <button className="btn-save" style={{ margin: 0 }} onClick={startNew}>+ Add Project</button>
        )}
      </div>

      {editingId === null && (
        <ul className="item-list">
          {items.length === 0 && <li className="empty-state">No projects yet. Click + Add Project to start.</li>}
          {items.map((item) => (
            <li key={item.id} className="item-row">
              <span className="item-icon">{item.data.icon}</span>
              <div style={{ flex: 1 }}>
                <div className="item-row-title">{item.data.title}</div>
                <div className="item-row-sub">{item.data.techs.map((t) => t.label).join(', ')}</div>
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
            <h4>{editingId === 'new' ? 'New Project' : 'Edit Project'}</h4>
            <button className="btn-edit" onClick={cancel}>Cancel</button>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Card Style</label>
              <select value={form.cardClass} onChange={(e) => setForm((f) => ({ ...f, cardClass: e.target.value }))}>
                {CARD_CLASSES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Icon Class</label>
              <select value={form.iconClass} onChange={(e) => setForm((f) => ({ ...f, iconClass: e.target.value }))}>
                {ICON_CLASSES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Icon (emoji)</label>
            <input value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} placeholder="🚀" />
          </div>

          <div className="form-group">
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Project name" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea rows={3} value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} placeholder="What does this project do?" />
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
            <button className="btn-add" onClick={() => setForm((f) => ({ ...f, techs: [...f.techs, { label: '', cls: 'pill-react' }] }))}>+ Add Tech</button>
          </div>

          <div className="form-group">
            <label>Links (label · tooltip · URL)</label>
            {form.links.map((l, i) => (
              <div key={i} className="array-row">
                <input value={l.label} onChange={(e) => updateLink(i, 'label', e.target.value)} placeholder="GH" style={{ maxWidth: 52 }} />
                <input value={l.title} onChange={(e) => updateLink(i, 'title', e.target.value)} placeholder="GitHub" />
                <input value={l.href} onChange={(e) => updateLink(i, 'href', e.target.value)} placeholder="https://..." style={{ flex: 2 }} />
                <button className="btn-remove" onClick={() => setForm((f) => ({ ...f, links: f.links.filter((_, idx) => idx !== i) }))}>✕</button>
              </div>
            ))}
            <button className="btn-add" onClick={() => setForm((f) => ({ ...f, links: [...f.links, { label: '', title: '', href: '#' }] }))}>+ Add Link</button>
          </div>

          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      )}
    </div>
  )
}
