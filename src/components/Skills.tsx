const skillGroups = [
  {
    icon: '☕', iconClass: 'icon-java', title: 'Java Backend', tagClass: 'java',
    tags: ['Java 17+', 'Spring Boot', 'Spring MVC', 'Spring Security', 'Hibernate / JPA', 'REST APIs', 'Maven / Gradle', 'Microservices', 'JUnit 5'],
  },
  {
    icon: '⚛️', iconClass: 'icon-react', title: 'React Frontend', tagClass: 'react',
    tags: ['React 18', 'TypeScript', 'Next.js', 'Redux / Zustand', 'React Query', 'Tailwind CSS', 'Vite', 'Jest / RTL'],
  },
  {
    icon: '🗄️', iconClass: 'icon-db', title: 'Databases & Cloud', tagClass: 'db',
    tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'AWS (EC2, S3, RDS)', 'Docker', 'Kubernetes'],
  },
  {
    icon: '🛠️', iconClass: 'icon-tools', title: 'Tools & Practices', tagClass: 'tools',
    tags: ['Git / GitHub', 'CI/CD', 'Agile / Scrum', 'Postman', 'IntelliJ IDEA', 'VS Code', 'Swagger / OpenAPI', 'Linux'],
  },
]

const bars = [
  { label: 'Java / Spring Boot', pct: 90, gradient: 'linear-gradient(90deg,#f97b4f,#f3b48a)' },
  { label: 'React / TypeScript', pct: 85, gradient: 'linear-gradient(90deg,#4f9cf9,#84c5f3)' },
  { label: 'REST API Design', pct: 92, gradient: 'linear-gradient(90deg,#38e2b8,#84f3d4)' },
  { label: 'Databases (SQL/NoSQL)', pct: 80, gradient: 'linear-gradient(90deg,#c584f3,#e2b4f9)' },
  { label: 'Docker / Cloud (AWS)', pct: 72, gradient: 'linear-gradient(90deg,#f9d44f,#f3e884)' },
]

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-header">
        <span className="section-num">01</span>
        <h2>Tech Stack</h2>
        <div className="line"></div>
      </div>

      <div className="skills-grid">
        {skillGroups.map((g) => (
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
    </section>
  )
}
