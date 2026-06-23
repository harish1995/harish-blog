type Pill = { label: string; cls: string }
type Project = {
  cardClass: string
  iconClass: string
  icon: string
  title: string
  desc: string
  links: { label: string; title: string }[]
  techs: Pill[]
}

const projects: Project[] = [
  {
    cardClass: 'card-full', iconClass: 'icon-react', icon: '🛒',
    title: 'E-Commerce Platform',
    desc: 'Fullstack online store with product catalog, cart, payments, and admin dashboard. JWT-secured REST API with real-time inventory updates.',
    links: [{ label: 'GH', title: 'GitHub' }, { label: '↗', title: 'Live' }],
    techs: [{ label: 'Spring Boot', cls: 'pill-java' }, { label: 'React', cls: 'pill-react' }, { label: 'PostgreSQL', cls: 'pill-green' }, { label: 'Redis', cls: 'pill-purple' }],
  },
  {
    cardClass: 'card-java', iconClass: 'icon-java', icon: '🏥',
    title: 'Hospital Management System',
    desc: 'Patient records, appointment scheduling, doctor management, and billing — built as a microservices architecture with role-based access.',
    links: [{ label: 'GH', title: 'GitHub' }, { label: '↗', title: 'Live' }],
    techs: [{ label: 'Java 17', cls: 'pill-java' }, { label: 'Spring Security', cls: 'pill-java' }, { label: 'MySQL', cls: 'pill-green' }, { label: 'Docker', cls: 'pill-gray' }],
  },
  {
    cardClass: 'card-react', iconClass: 'icon-react', icon: '📊',
    title: 'Analytics Dashboard',
    desc: 'Interactive data visualization dashboard with charts, filters, and live data feeds. Supports CSV export and custom date ranges.',
    links: [{ label: 'GH', title: 'GitHub' }, { label: '↗', title: 'Live' }],
    techs: [{ label: 'React 18', cls: 'pill-react' }, { label: 'TypeScript', cls: 'pill-react' }, { label: 'Recharts', cls: 'pill-react' }, { label: 'REST API', cls: 'pill-java' }],
  },
  {
    cardClass: 'card-java', iconClass: 'icon-java', icon: '🔐',
    title: 'Auth Microservice',
    desc: 'Standalone auth service with JWT, OAuth2, refresh tokens, rate limiting, and audit logging. Plug-and-play for any Spring Boot app.',
    links: [{ label: 'GH', title: 'GitHub' }],
    techs: [{ label: 'Spring Security', cls: 'pill-java' }, { label: 'OAuth2', cls: 'pill-java' }, { label: 'Redis', cls: 'pill-purple' }, { label: 'Docker', cls: 'pill-gray' }],
  },
  {
    cardClass: 'card-react', iconClass: 'icon-react', icon: '💬',
    title: 'Real-Time Chat App',
    desc: 'WebSocket-based group chat with message history, typing indicators, file sharing, and read receipts. Mobile-responsive UI.',
    links: [{ label: 'GH', title: 'GitHub' }, { label: '↗', title: 'Live' }],
    techs: [{ label: 'WebSocket', cls: 'pill-java' }, { label: 'React', cls: 'pill-react' }, { label: 'MongoDB', cls: 'pill-green' }, { label: 'AWS S3', cls: 'pill-gray' }],
  },
  {
    cardClass: 'card-full', iconClass: 'icon-tools', icon: '📝',
    title: 'Task Management App',
    desc: 'Kanban-style project tracker with drag-and-drop boards, team collaboration, deadlines, priority tags, and email notifications.',
    links: [{ label: 'GH', title: 'GitHub' }, { label: '↗', title: 'Live' }],
    techs: [{ label: 'Spring Boot', cls: 'pill-java' }, { label: 'Next.js', cls: 'pill-react' }, { label: 'PostgreSQL', cls: 'pill-green' }, { label: 'CI/CD', cls: 'pill-gray' }],
  },
]

export default function Projects() {
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
                  <a key={l.label} href="#" className="project-link" title={l.title}>{l.label}</a>
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
