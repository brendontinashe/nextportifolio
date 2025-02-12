"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Projects from "../components/Projects"
import Certificates from "../components/Certificates"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import SettingsPanel from "../components/SettingsPanel"
import SectionWrapper from "../components/SectionWrapper"
import LoadingPage from "../components/LoadingPage"
import ScrollToTopButton from "../components/ScrollToTopButton"

// Dynamically import components that might cause hydration issues
const DynamicSkills = dynamic(() => import("../components/Skills"), { ssr: false })

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [theme, setTheme] = useState("cyber")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "skills", "certificates", "contact"]
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Simulate loading time (remove this in production and replace with actual initialization logic)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <main className="relative">
      <Header activeSection={activeSection} />
      <SectionWrapper id="home" bgClass="bg-nightsky">
        <Hero />
      </SectionWrapper>
      <SectionWrapper id="projects" bgClass="bg-sunset">
        <Projects />
      </SectionWrapper>
      <SectionWrapper id="skills" bgClass="bg-dusk">
        <DynamicSkills />
      </SectionWrapper>
      <SectionWrapper id="certificates" bgClass="bg-dawn">
        <Certificates />
      </SectionWrapper>
      <SectionWrapper id="contact" bgClass="bg-aurora">
        <Contact />
      </SectionWrapper>
      <Footer />
      <SettingsPanel theme={theme} setTheme={setTheme} />
      <ScrollToTopButton />
    </main>
  )
}

