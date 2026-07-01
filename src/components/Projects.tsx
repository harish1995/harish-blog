import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import type { Project } from '../types'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    return onSnapshot(query(collection(db, 'projects'), orderBy('order')), (snap) =>
      setProjects(snap.docs.map((d) => d.data() as Project))
    )
  }, [])

  return (
    <section className="section" id="projects">
      <div className="section-header">
        <span className="section-num">02</span>
        <h2>Projects</h2>
        <div className="line"></div>
      </div>
      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.title} className={`glass project-card ${p.cardClass}`}>
            <div className="project-top">
              <div className={`project-icon ${p.iconClass}`}>{p.icon}</div>
              <div className="project-links">
                {p.links.map((l) => (
                  <a key={l.label} href={l.href || '#'} className="project-link" title={l.title}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="project-techs">
              {p.techs.map((t) => (
                <span key={t.label} className={`tech-pill ${t.cls}`}>{t.label}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
