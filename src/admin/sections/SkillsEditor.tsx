import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, addDoc, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import type { SkillGroup, SkillBar } from '../../types'

type GroupDoc = { id: string; data: SkillGroup }
type BarDoc = { id: string; data: SkillBar }

const ICON_CLASSES = ['icon-java', 'icon-react', 'icon-db', 'icon-tools']
const TAG_CLASSES = ['java', 'react', 'db', 'tools']

const blankGroup: Omit<SkillGroup, 'order'> = { icon: '', iconClass: 'icon-tools', title: '', tagClass: 'tools', tags: [] }
const blankBar: Omit<SkillBar, 'order'> = { label: '', pct: 80, gradient: 'linear-gradient(90deg,#4f9cf9,#84c5f3)' }

export default function SkillsEditor() {
  const [groups, setGroups] = useState<GroupDoc[]>([])
  const [bars, setBars] = useState<BarDoc[]>([])
  const [editingGroup, setEditingGroup] = useState<string | 'new' | null>(null)
  const [editingBar, setEditingBar] = useState<string | 'new' | null>(null)
  const [groupForm, setGroupForm] = useState<Omit<SkillGroup, 'order'>>(blankGroup)
  const [barForm, setBarForm] = useState<Omit<SkillBar, 'order'>>(blankBar)
  const [saving, setSaving] = useState(false)

  async function loadGroups() {
    const snap = await getDocs(query(collection(db, 'skills'), orderBy('order')))
    setGroups(snap.docs.map((d) => ({ id: d.id, data: d.data() as SkillGroup })))
  }
  async function loadBars() {
    const snap = await getDocs(query(collection(db, 'skillBars'), orderBy('order')))
    setBars(snap.docs.map((d) => ({ id: d.id, data: d.data() as SkillBar })))
  }

  useEffect(() => { loadGroups(); loadBars() }, [])

  async function saveGroup() {
    setSaving(true)
    const tagsArr = typeof groupForm.tags === 'string'
      ? (groupForm.tags as string).split(',').map((t) => t.trim()).filter(Boolean)
      : groupForm.tags
    const payload = { ...groupForm, tags: tagsArr }
    if (editingGroup === 'new') {
      await addDoc(collection(db, 'skills'), { ...payload, order: groups.length })
    } else {
      const existing = groups.find((g) => g.id === editingGroup)!
      await setDoc(doc(db, 'skills', editingGroup!), { ...payload, order: existing.data.order })
    }
    await loadGroups()
    setEditingGroup(null)
    setSaving(false)
  }

  async function saveBar() {
    setSaving(true)
    if (editingBar === 'new') {
      await addDoc(collection(db, 'skillBars'), { ...barForm, order: bars.length })
    } else {
      const existing = bars.find((b) => b.id === editingBar)!
      await setDoc(doc(db, 'skillBars', editingBar!), { ...barForm, order: existing.data.order })
    }
    await loadBars()
    setEditingBar(null)
    setSaving(false)
  }

  return (
    <div className="editor">
      {/* ── Skill Groups ── */}
      <div className="header-row">
        <h2>Skills</h2>
        {editingGroup === null && (
          <button className="btn-save" style={{ margin: 0 }} onClick={() => { setEditingGroup('new'); setGroupForm({ ...blankGroup }) }}>
            + Add Group
          </button>
        )}
      </div>

      {editingGroup === null && (
        <ul className="item-list">
          {groups.length === 0 && <li className="empty-state">No skill groups yet.</li>}
          {groups.map((g) => (
            <li key={g.id} className="item-row">
              <span className="item-icon">{g.data.icon}</span>
              <div style={{ flex: 1 }}>
                <div className="item-row-title">{g.data.title}</div>
                <div className="item-row-sub">{g.data.tags.slice(0, 4).join(', ')}{g.data.tags.length > 4 ? '...' : ''}</div>
              </div>
              <button className="btn-edit" onClick={() => { setEditingGroup(g.id); setGroupForm({ ...g.data }) }}>Edit</button>
              <button className="btn-danger" onClick={async () => { if (window.confirm('Delete?')) { await deleteDoc(doc(db, 'skills', g.id)); loadGroups() } }}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {editingGroup !== null && (
        <div className="edit-form">
          <div className="edit-form-header">
            <h4>{editingGroup === 'new' ? 'New Skill Group' : 'Edit Skill Group'}</h4>
            <button className="btn-edit" onClick={() => setEditingGroup(null)}>Cancel</button>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Icon (emoji)</label>
              <input value={groupForm.icon} onChange={(e) => setGroupForm((f) => ({ ...f, icon: e.target.value }))} placeholder="☕" />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input value={groupForm.title} onChange={(e) => setGroupForm((f) => ({ ...f, title: e.target.value }))} placeholder="Java Backend" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Icon Class</label>
              <select value={groupForm.iconClass} onChange={(e) => setGroupForm((f) => ({ ...f, iconClass: e.target.value }))}>
                {ICON_CLASSES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Tag Colour Class</label>
              <select value={groupForm.tagClass} onChange={(e) => setGroupForm((f) => ({ ...f, tagClass: e.target.value }))}>
                {TAG_CLASSES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <textarea
              rows={3}
              value={Array.isArray(groupForm.tags) ? groupForm.tags.join(', ') : groupForm.tags}
              onChange={(e) => setGroupForm((f) => ({ ...f, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) }))}
              placeholder="Java 17+, Spring Boot, Hibernate..."
            />
          </div>

          <button className="btn-save" onClick={saveGroup} disabled={saving}>
            {saving ? 'Saving...' : 'Save Group'}
          </button>
        </div>
      )}

      <hr className="divider" />

      {/* ── Skill Bars ── */}
      <div className="header-row">
        <h3 style={{ margin: 0 }}>Proficiency Bars</h3>
        {editingBar === null && (
          <button className="btn-primary-sm" onClick={() => { setEditingBar('new'); setBarForm({ ...blankBar }) }}>
            + Add Bar
          </button>
        )}
      </div>

      {editingBar === null && (
        <ul className="item-list" style={{ marginTop: '0.75rem' }}>
          {bars.length === 0 && <li className="empty-state">No bars yet.</li>}
          {bars.map((b) => (
            <li key={b.id} className="item-row">
              <div style={{ flex: 1 }}>
                <div className="item-row-title">{b.data.label}</div>
                <div className="item-row-sub">{b.data.pct}%</div>
              </div>
              <button className="btn-edit" onClick={() => { setEditingBar(b.id); setBarForm({ ...b.data }) }}>Edit</button>
              <button className="btn-danger" onClick={async () => { if (window.confirm('Delete?')) { await deleteDoc(doc(db, 'skillBars', b.id)); loadBars() } }}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {editingBar !== null && (
        <div className="edit-form" style={{ marginTop: '0.75rem' }}>
          <div className="edit-form-header">
            <h4>{editingBar === 'new' ? 'New Bar' : 'Edit Bar'}</h4>
            <button className="btn-edit" onClick={() => setEditingBar(null)}>Cancel</button>
          </div>

          <div className="form-group">
            <label>Label</label>
            <input value={barForm.label} onChange={(e) => setBarForm((f) => ({ ...f, label: e.target.value }))} placeholder="Java / Spring Boot" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Percentage (0–100)</label>
              <input type="number" min={0} max={100} value={barForm.pct} onChange={(e) => setBarForm((f) => ({ ...f, pct: Number(e.target.value) }))} />
            </div>
            <div className="form-group">
              <label>Gradient CSS</label>
              <input value={barForm.gradient} onChange={(e) => setBarForm((f) => ({ ...f, gradient: e.target.value }))} placeholder="linear-gradient(...)" />
            </div>
          </div>

          <button className="btn-save" onClick={saveBar} disabled={saving}>
            {saving ? 'Saving...' : 'Save Bar'}
          </button>
        </div>
      )}
    </div>
  )
}
