type Pill = { label: string; cls: string }
type Job = {
  current?: boolean
  title: string
  date: string
  company: string
  desc: string
  techs: Pill[]
}

const jobs: Job[] = [
  {
    current: true,
    title: 'Senior Fullstack Developer',
    date: 'Jan 2024 – Present',
    company: 'Tech Solutions Pvt. Ltd. · Full-time',
    desc: 'Leading development of microservices-based e-commerce platform. Architected Java Spring Boot services handling 50K+ requests/day, and built React dashboards for real-time business analytics. Mentored 2 junior developers.',
    techs: [
      { label: 'Spring Boot', cls: 'pill-java' }, { label: 'React', cls: 'pill-react' },
      { label: 'PostgreSQL', cls: 'pill-green' }, { label: 'Kubernetes', cls: 'pill-gray' }, { label: 'AWS', cls: 'pill-gray' },
    ],
  },
  {
    title: 'Fullstack Developer',
    date: 'Jun 2022 – Dec 2023',
    company: 'WebCraft Agency · Full-time',
    desc: 'Built and maintained 8+ client web applications using Java/Spring on backend and React on frontend. Reduced API response time by 40% through query optimization and Redis caching. Set up CI/CD pipelines using GitHub Actions.',
    techs: [
      { label: 'Java', cls: 'pill-java' }, { label: 'React', cls: 'pill-react' },
      { label: 'Redis', cls: 'pill-purple' }, { label: 'MySQL', cls: 'pill-gray' }, { label: 'Docker', cls: 'pill-gray' },
    ],
  },
  {
    title: 'Java Backend Intern',
    date: 'Jan 2022 – May 2022',
    company: 'Innovate Labs · Internship',
    desc: 'Developed REST APIs for internal HR management tool using Spring Boot and PostgreSQL. Built automated test suites with JUnit 5, achieving 85% code coverage.',
    techs: [
      { label: 'Spring Boot', cls: 'pill-java' }, { label: 'JUnit 5', cls: 'pill-java' },
      { label: 'PostgreSQL', cls: 'pill-green' }, { label: 'Maven', cls: 'pill-gray' },
    ],
  },
]

export default function Experience() {
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
