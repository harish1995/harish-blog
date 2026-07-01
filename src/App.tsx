import Background from './components/Background'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminApp from './admin/AdminApp'

function App() {
  if (window.location.pathname.endsWith('/admin') || window.location.pathname.endsWith('/admin/')) {
    return <AdminApp />
  }

  return (
    <>
      <Background />
      <Nav />
      <Hero />
      <div className="wrapper">
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
      <div className="wrapper">
        <Footer />
      </div>
    </>
  )
}

export default App
