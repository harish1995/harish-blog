import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import type { HeroData } from '../types'
import heroImg from '/public/106.png'

export default function Hero() {
  const [data, setData] = useState<HeroData | null>(null)

  useEffect(() => {
    return onSnapshot(doc(db, 'portfolio', 'hero'), (snap) => {
      if (snap.exists()) setData(snap.data() as HeroData)
    })
  }, [])

  return (
    <section className="hero" id="home">
      <img src={data?.imageUrl || heroImg} alt="" className="hero-img" />
      <div className="hero-content">
        <div className="wrapper">
          <div className="hero-text">
            <div className="badge">
              <div className="badge-dot"></div>
              {data?.badge ?? 'Available for opportunities'}
            </div>
            <h1>
              {data?.name ?? "Hi, I'm"}{' '}
              <span className="accent">{data?.nameAccent ?? 'Harish K.'}</span>
            </h1>
            <p className="hero-subtitle">
              <strong>{data?.subtitle ?? 'Fullstack Developer · Java Backend + React Frontend'}</strong>
            </p>
            <p>{data?.description ?? 'I build robust, scalable web applications from the ground up.'}</p>
            <div className="stat-row">
              {(data?.stats ?? [
                { value: '3+', label: 'Years Exp' },
                { value: '20+', label: 'Projects' },
                { value: '10+', label: 'Clients' },
              ]).map((s) => (
                <div key={s.label} className="stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="hero-btns">
              <a href="#projects" className="btn-primary">View Projects →</a>
              <a href="#contact" className="btn-secondary">Get in Touch</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
