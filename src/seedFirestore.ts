import { doc, setDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from './firebase'
import type { HeroData, ContactData, SkillGroup, SkillBar, Project, Job } from './types'

const heroData: HeroData = {
  badge: 'Available for opportunities',
  name: "Hi, I'm",
  nameAccent: 'Harish K.',
  subtitle: 'Fullstack Developer · Java Backend + React Frontend',
  description:
    'I build robust, scalable web applications from the ground up — designing clean REST APIs with Java & Spring Boot on the backend and crafting responsive, interactive UIs with React on the frontend.',
  stats: [
    { value: '3+', label: 'Years Exp' },
    { value: '20+', label: 'Projects' },
    { value: '10+', label: 'Clients' },
  ],
}

const contactData: ContactData = {
  heading: "Let's Build Something",
  subtext:
    'Open to fullstack roles, freelance projects, and collaborations. Feel free to reach out — I usually reply within 24 hours.',
  email: 'harihartech@gmail.com',
  location: 'India · Open to Remote',
  availability: 'Available from May 2026',
  socials: [
    { icon: '🐙', label: 'GitHub', href: '#' },
    { icon: '💼', label: 'LinkedIn', href: '#' },
    { icon: '🐦', label: 'Twitter', href: '#' },
    { icon: '📄', label: 'Resume', href: '#' },
  ],
}

const skillGroups: Omit<SkillGroup, 'order'>[] = [
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

const skillBars: Omit<SkillBar, 'order'>[] = [
  { label: 'Java / Spring Boot', pct: 90, gradient: 'linear-gradient(90deg,#f97b4f,#f3b48a)' },
  { label: 'React / TypeScript', pct: 85, gradient: 'linear-gradient(90deg,#4f9cf9,#84c5f3)' },
  { label: 'REST API Design', pct: 92, gradient: 'linear-gradient(90deg,#38e2b8,#84f3d4)' },
  { label: 'Databases (SQL/NoSQL)', pct: 80, gradient: 'linear-gradient(90deg,#c584f3,#e2b4f9)' },
  { label: 'Docker / Cloud (AWS)', pct: 72, gradient: 'linear-gradient(90deg,#f9d44f,#f3e884)' },
]

const projects: Omit<Project, 'order'>[] = [
  {
    cardClass: 'card-full', iconClass: 'icon-react', icon: '🛒',
    title: 'E-Commerce Platform',
    desc: 'Fullstack online store with product catalog, cart, payments, and admin dashboard. JWT-secured REST API with real-time inventory updates.',
    links: [{ label: 'GH', title: 'GitHub', href: '#' }, { label: '↗', title: 'Live', href: '#' }],
    techs: [{ label: 'Spring Boot', cls: 'pill-java' }, { label: 'React', cls: 'pill-react' }, { label: 'PostgreSQL', cls: 'pill-green' }, { label: 'Redis', cls: 'pill-purple' }],
  },
  {
    cardClass: 'card-java', iconClass: 'icon-java', icon: '🏥',
    title: 'Hospital Management System',
    desc: 'Patient records, appointment scheduling, doctor management, and billing — built as a microservices architecture with role-based access.',
    links: [{ label: 'GH', title: 'GitHub', href: '#' }, { label: '↗', title: 'Live', href: '#' }],
    techs: [{ label: 'Java 17', cls: 'pill-java' }, { label: 'Spring Security', cls: 'pill-java' }, { label: 'MySQL', cls: 'pill-green' }, { label: 'Docker', cls: 'pill-gray' }],
  },
  {
    cardClass: 'card-react', iconClass: 'icon-react', icon: '📊',
    title: 'Analytics Dashboard',
    desc: 'Interactive data visualization dashboard with charts, filters, and live data feeds. Supports CSV export and custom date ranges.',
    links: [{ label: 'GH', title: 'GitHub', href: '#' }, { label: '↗', title: 'Live', href: '#' }],
    techs: [{ label: 'React 18', cls: 'pill-react' }, { label: 'TypeScript', cls: 'pill-react' }, { label: 'Recharts', cls: 'pill-react' }, { label: 'REST API', cls: 'pill-java' }],
  },
  {
    cardClass: 'card-java', iconClass: 'icon-java', icon: '🔐',
    title: 'Auth Microservice',
    desc: 'Standalone auth service with JWT, OAuth2, refresh tokens, rate limiting, and audit logging. Plug-and-play for any Spring Boot app.',
    links: [{ label: 'GH', title: 'GitHub', href: '#' }],
    techs: [{ label: 'Spring Security', cls: 'pill-java' }, { label: 'OAuth2', cls: 'pill-java' }, { label: 'Redis', cls: 'pill-purple' }, { label: 'Docker', cls: 'pill-gray' }],
  },
  {
    cardClass: 'card-react', iconClass: 'icon-react', icon: '💬',
    title: 'Real-Time Chat App',
    desc: 'WebSocket-based group chat with message history, typing indicators, file sharing, and read receipts. Mobile-responsive UI.',
    links: [{ label: 'GH', title: 'GitHub', href: '#' }, { label: '↗', title: 'Live', href: '#' }],
    techs: [{ label: 'WebSocket', cls: 'pill-java' }, { label: 'React', cls: 'pill-react' }, { label: 'MongoDB', cls: 'pill-green' }, { label: 'AWS S3', cls: 'pill-gray' }],
  },
  {
    cardClass: 'card-full', iconClass: 'icon-tools', icon: '📝',
    title: 'Task Management App',
    desc: 'Kanban-style project tracker with drag-and-drop boards, team collaboration, deadlines, priority tags, and email notifications.',
    links: [{ label: 'GH', title: 'GitHub', href: '#' }, { label: '↗', title: 'Live', href: '#' }],
    techs: [{ label: 'Spring Boot', cls: 'pill-java' }, { label: 'Next.js', cls: 'pill-react' }, { label: 'PostgreSQL', cls: 'pill-green' }, { label: 'CI/CD', cls: 'pill-gray' }],
  },
]

const jobs: Omit<Job, 'order'>[] = [
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

async function clearCollection(name: string) {
  const snap = await getDocs(collection(db, name))
  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)))
}

export async function seedFirestore() {
  console.log('Seeding Firestore...')

  // Single documents
  await setDoc(doc(db, 'portfolio', 'hero'), heroData)
  await setDoc(doc(db, 'portfolio', 'contact'), contactData)

  // Collections — clear first to avoid duplicates on re-seed
  await clearCollection('skills')
  await clearCollection('skillBars')
  await clearCollection('projects')
  await clearCollection('experience')

  await Promise.all(skillGroups.map((g, i) => addDoc(collection(db, 'skills'), { ...g, order: i })))
  await Promise.all(skillBars.map((b, i) => addDoc(collection(db, 'skillBars'), { ...b, order: i })))
  await Promise.all(projects.map((p, i) => addDoc(collection(db, 'projects'), { ...p, order: i })))
  await Promise.all(jobs.map((j, i) => addDoc(collection(db, 'experience'), { ...j, order: i })))

  console.log('Seeding complete!')
}
