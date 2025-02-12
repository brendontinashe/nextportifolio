"use client"

import { motion } from "framer-motion"
import { GitlabIcon as GitHub, Linkedin, Twitter, Instagram, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="footer bg-black bg-opacity-50 backdrop-blur-md py-12">
      <div className="container mx-auto px-4">
        <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">Brendon Buwerimwe</h3>
            <p className="footer-tagline text-gray-300 mb-4">Building the future, one line of code at a time</p>
            <div className="footer-social flex space-x-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-neon-blue transition-colors duration-200"
              >
                <GitHub />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-neon-blue transition-colors duration-200"
              >
                <Linkedin />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-neon-blue transition-colors duration-200"
              >
                <Twitter />
              </a>
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-neon-blue transition-colors duration-200"
              >
                <Instagram />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="footer-links space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  Skills
                </a>
              </li>
              <li>
                <a href="#certificates" className="text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  Certificates
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-neon-blue transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-xl font-bold mb-4">Newsletter</h4>
            <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow p-2 bg-gray-800 rounded-l border border-gray-700 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                />
                <button type="submit" className="cyber-button rounded-r">
                  Subscribe
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <div className="footer-bottom mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-300">© {new Date().getFullYear()} Brendon Buwerimwe. All rights reserved.</p>
          <p className="text-gray-400 mt-2 flex items-center justify-center">
            Made with <Heart className="text-neon-pink mx-1" /> and Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}

