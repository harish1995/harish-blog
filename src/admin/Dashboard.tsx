import { useState } from 'react'
import { signOut, User } from 'firebase/auth'
import { auth } from '../firebase'
import HeroEditor from './sections/HeroEditor'
import ContactEditor from './sections/ContactEditor'
import ProjectsEditor from './sections/ProjectsEditor'
import SkillsEditor from './sections/SkillsEditor'
import ExperienceEditor from './sections/ExperienceEditor'
import Messages from './sections/Messages'

const TABS = ['Hero', 'Skills', 'Projects', 'Experience', 'Contact', 'Messages']

export default function Dashboard({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState('Hero')

  return (
    <div className="admin-root">
      <header className="admin-header">
        <h1>Portfolio Admin</h1>
        <div className="admin-user">
          <span>{user.email}</span>
          <button className="sign-out-btn" onClick={() => signOut(auth)}>Sign Out</button>
        </div>
      </header>

      <nav className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`admin-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="admin-content">
        {activeTab === 'Hero'       && <HeroEditor />}
        {activeTab === 'Skills'     && <SkillsEditor />}
        {activeTab === 'Projects'   && <ProjectsEditor />}
        {activeTab === 'Experience' && <ExperienceEditor />}
        {activeTab === 'Contact'    && <ContactEditor />}
        {activeTab === 'Messages'   && <Messages />}
      </main>
    </div>
  )
}
