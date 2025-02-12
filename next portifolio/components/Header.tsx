"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Home, Code, Brain, Send, Menu, X, Award, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

interface HeaderProps {
  activeSection: string
}

export default function Header({ activeSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#home", icon: Home, text: "Home" },
    { href: "#projects", icon: Code, text: "Projects" },
    { href: "#skills", icon: Brain, text: "Skills" },
    { href: "#certificates", icon: Award, text: "Certificates" },
    { href: "#contact", icon: Send, text: "Contact" },
  ]

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="header-profile flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20240119_100550_274.jpg-4o8iXgExGhdWtp3UJSYAWdk2kIf8Vk.jpeg"
              alt="Logo"
              width={45}
              height={45}
              className="rounded-lg mr-2 object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
            />
            <span className="profile-text text-primary font-bold">BB</span>
          </div>

          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item group ${
                  activeSection === item.href.slice(1) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center hover:text-primary transition-colors duration-200"
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.text}</span>
                </motion.div>
                <span
                  className={`block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 ${
                    activeSection === item.href.slice(1) ? "bg-primary" : "bg-primary"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-primary hover:text-primary/80 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 hover:text-primary transition-colors duration-200 ${
                  activeSection === item.href.slice(1) ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.text}</span>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </header>
  )
}

