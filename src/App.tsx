import { useEffect } from 'react'
import { Backdrop } from './components/layout/Backdrop'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Skills } from './components/sections/Skills'
import { Section } from './components/ui/Section'

// Marca en <html> la dirección de cada gesto de scroll (la usa la transición entre secciones en index.css).
// Se fija al inicio del gesto y no cambia hasta que el scroll se detiene: el retorno del snap no la invierte.
function useScrollDirection() {
  useEffect(() => {
    const root = document.documentElement
    let lastY = window.scrollY
    let settled = true
    let idleTimer = 0

    const onScroll = () => {
      const y = window.scrollY
      if (settled && y !== lastY) {
        root.dataset.scrollDir = y > lastY ? 'down' : 'up'
        settled = false
      }
      lastY = y
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        settled = true
      }, 150)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(idleTimer)
    }
  }, [])
}

function App() {
  useScrollDirection()

  return (
    <>
      <Backdrop />
      <Header />
      <main>
        <Hero />
        <Section id="about" eyebrow="About" title="Professional Summary">
          <About />
        </Section>
        <Section id="skills" eyebrow="Skills" title="Technical Skills">
          <Skills />
        </Section>
        <Section id="experience" eyebrow="Experience" title="Professional Experience">
          <Experience />
        </Section>
        <Section id="education" eyebrow="Education" title="Education">
          <Education />
        </Section>
        <Section id="contact" eyebrow="Contact" title="Contact">
          <Contact />
        </Section>
      </main>
      <Footer />
    </>
  )
}

export default App
