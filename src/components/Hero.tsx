export default function Hero() {
  return (
    <section className="hero" id="home">
      <img src="/106.png" alt="" className="hero-img" />
      <div className="hero-content">
        <div className="wrapper">
          <div className="hero-text">
            <div className="badge">
              <div className="badge-dot"></div>
              Available for opportunities
            </div>
            <h1>Hi, I'm <span className="accent">Harish K.</span></h1>
            <p className="hero-subtitle">
              <strong>Fullstack Developer</strong> · Java Backend + React Frontend
            </p>
            <p>
              I build robust, scalable web applications from the ground up — designing clean REST
              APIs with Java &amp; Spring Boot on the backend and crafting responsive, interactive
              UIs with React on the frontend.
            </p>
            <div className="stat-row">
              <div className="stat"><strong>3+</strong><span>Years Exp</span></div>
              <div className="stat"><strong>20+</strong><span>Projects</span></div>
              <div className="stat"><strong>10+</strong><span>Clients</span></div>
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
