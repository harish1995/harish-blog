import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import type { SkillGroup, SkillBar } from '../types'

export default function Skills() {
  const [groups, setGroups] = useState<SkillGroup[]>([])
  const [bars, setBars] = useState<SkillBar[]>([])

  useEffect(() => {
    const unsubGroups = onSnapshot(query(collection(db, 'skills'), orderBy('order')), (snap) =>
      setGroups(snap.docs.map((d) => d.data() as SkillGroup))
    )
    const unsubBars = onSnapshot(query(collection(db, 'skillBars'), orderBy('order')), (snap) =>
      setBars(snap.docs.map((d) => d.data() as SkillBar))
    )
    return () => { unsubGroups(); unsubBars() }
  }, [])

  return (
    <section className="section" id="skills">
      <div className="section-header">
        <span className="section-num">01</span>
        <h2>Tech Stack</h2>
        <div className="line"></div>
      </div>

      <div className="skills-grid">
        {groups.map((g) => (
          <div key={g.title} className="glass skill-group">
            <div className="skill-group-header">
              <div className={`skill-group-icon ${g.iconClass}`}>{g.icon}</div>
              <h4>{g.title}</h4>
            </div>
            <div className="skill-tags">
              {g.tags.map((t) => (
                <span key={t} className={`skill-tag ${g.tagClass}`}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {bars.length > 0 && (
        <div className="skill-bars" style={{ maxWidth: '560px', marginTop: '2rem' }}>
          {bars.map((b) => (
            <div key={b.label} className="bar-item">
              <div className="bar-label">
                <span>{b.label}</span>
                <span>{b.pct}%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${b.pct}%`, background: b.gradient }}></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
