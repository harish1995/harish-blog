export type Pill = { label: string; cls: string }

export type HeroData = {
  badge: string
  name: string
  nameAccent: string
  subtitle: string
  description: string
  imageUrl?: string
  stats: { value: string; label: string }[]
}

export type ContactData = {
  heading: string
  subtext: string
  email: string
  location: string
  availability: string
  socials: { icon: string; label: string; href: string }[]
}

export type SkillGroup = {
  icon: string
  iconClass: string
  title: string
  tagClass: string
  tags: string[]
  order: number
}

export type SkillBar = {
  label: string
  pct: number
  gradient: string
  order: number
}

export type Project = {
  cardClass: string
  iconClass: string
  icon: string
  title: string
  desc: string
  links: { label: string; title: string; href: string }[]
  techs: Pill[]
  order: number
}

export type Job = {
  current?: boolean
  title: string
  date: string
  company: string
  desc: string
  techs: Pill[]
  order: number
}
