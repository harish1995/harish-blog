import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import type { Job } from '../types'

export default function Experience() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    return onSnapshot(query(collection(db, 'experience'), orderBy('order')), (snap) =>
      setJobs(snap.docs.map((d) => d.data() as Job))
    )
  }, [])

  return (
    <section className="section" id="experience">
      <div className="section-header">
        <span className="section-num">03</span>
        <h2>Experience</h2>
        <div className="line"></div>
      </div>
      <div className="timeline">
        {jobs.map((job) => (
          <div key={job.title} className="timeline-item">
            <div className={`timeline-dot${job.current ? ' current' : ''}`}></div>
            <div className="exp-header">
              <h3>{job.title}</h3>
              <span className="exp-date">{job.date}</span>
            </div>
            <div className="exp-company">{job.company}</div>
            <p className="exp-desc">{job.desc}</p>
            <div className="exp-techs">
              {job.techs.map((t) => (
                <span key={t.label} className={`tech-pill ${t.cls}`}>{t.label}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
