import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav>
        <div className="wrapper">
          <div className="nav-inner">
            <div className="logo">harish<span>.dev</span></div>
            <ul className={`nav-links${open ? ' open' : ''}`}>
              <li><a href="#skills"     onClick={() => setOpen(false)}>Skills</a></li>
              <li><a href="#projects"   onClick={() => setOpen(false)}>Projects</a></li>
              <li><a href="#experience" onClick={() => setOpen(false)}>Experience</a></li>
              <li><a href="#contact"    onClick={() => setOpen(false)}>Contact</a></li>
            </ul>
            <a href="#contact" className="nav-cta">Hire Me</a>
            <button
              className="hamburger"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>
      {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}
    </>
  )
}
