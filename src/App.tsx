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
import { useSectionScroll } from './lib/sectionScroll'

function App() {
  useSectionScroll()

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
