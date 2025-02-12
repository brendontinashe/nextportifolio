"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useAnimation } from "framer-motion"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

const generateStars = (count: number) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random(),
  }))
}

const useStars = (count: number) => {
  return useMemo(() => generateStars(count), [count])
}

export default function Hero() {
  const dynamicTextRef = useRef<HTMLSpanElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const techStack = ["React", "Node.js", "Python", "MongoDB"]
  const [stackIndex, setStackIndex] = useState(0)
  const [currentName, setCurrentName] = useState("Brendon T Buwerimwe")
  const [isAnimating, setIsAnimating] = useState(false)
  const controls = useAnimation()
  const stars = useStars(200)

  useEffect(() => {
    const animateNames = async () => {
      const names = ["Brendon T Buwerimwe", "Tinashe Buwerimwe", "Btb_tynashe"]
      for (let i = 0; i < names.length; i++) {
        setIsAnimating(true)
        await new Promise((resolve) => setTimeout(resolve, 500)) // Fade out
        setCurrentName(names[i])
        setIsAnimating(false)
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Display time
      }
    }
    animateNames()
  }, [])

  useEffect(() => {
    const words = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Tech Innovator", "Code Artisan"]
    let currentIndex = 0
    let isDeleting = false
    let txt = ""

    function type() {
      const currentWord = words[currentIndex]
      const typeSpeed = isDeleting ? 100 : 200

      if (isDeleting) {
        txt = currentWord.substring(0, txt.length - 1)
      } else {
        txt = currentWord.substring(0, txt.length + 1)
      }

      if (dynamicTextRef.current) {
        dynamicTextRef.current.textContent = txt
      }

      if (!isDeleting && txt === currentWord) {
        setTimeout(() => {
          isDeleting = true
        }, 3000)
      } else if (isDeleting && txt === "") {
        isDeleting = false
        currentIndex = (currentIndex + 1) % words.length
      }

      setTimeout(type, typeSpeed)
    }

    type()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setStackIndex((prevIndex) => (prevIndex + 1) % techStack.length)
    }, 2000) // Change word every 2 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleDownloadCV = () => {
    const cvUrl = "/Brendon_Buwerimwe_CV.pdf"
    const link = document.createElement("a")
    link.href = cvUrl
    link.download = "Brendon_Buwerimwe_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section
      id="home"
      className={`hero futuristic-bg min-h-screen flex items-center justify-center relative ${inter.className}`}
      style={{ cursor: 'url("/ufo-cursor.png"), auto' }}
    >
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,243,255,0.3) 0%, transparent 20%)`,
        }}
      >
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </motion.div>
      <div className="container relative z-10">
        <motion.div
          className="hero-content text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="glitch-text neon-text text-6xl mb-4 font-sans"
            animate={{ opacity: isAnimating ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            {currentName}
          </motion.h1>
          <p className="cyber-title text-2xl mb-8">
            <span className="title-tag">&lt;</span>
            <span ref={dynamicTextRef} className="neon-text"></span>
            <span className="title-tag">/&gt;</span>
          </p>
          <motion.div
            className="tech-stack-animation flex justify-center items-center h-16 mb-12 relative"
            initial="hidden"
            animate="visible"
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                className="tech-item neon-border p-2 rounded absolute"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: index === stackIndex ? 1 : 0.3,
                  scale: index === stackIndex ? 1 : 0.8,
                  rotate: index === stackIndex ? 0 : 45,
                  x: `${((index - stackIndex + techStack.length) % techStack.length) * 100 - 150}%`,
                }}
                transition={{ duration: 0.5 }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
          <div className="hero-buttons flex justify-center gap-4">
            <motion.button
              className="cyber-button download-cv rounded-full px-6 py-3 bg-primary text-background"
              onClick={handleDownloadCV}
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px #00f3ff" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="mr-2">📥</span>
              Download CV
            </motion.button>
            <motion.button
              className="cyber-button view-projects rounded-full px-6 py-3 bg-secondary text-background"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px #ff2957" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="mr-2">🚀</span>
              View Projects
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

