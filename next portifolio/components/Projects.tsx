"use client"

import { useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectCube } from "swiper/modules"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-cube"

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  images: string[]
  githubLink: string
  liveLink: string
  features: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Farmer's Pad",
    description:
      "A comprehensive farming management application designed to help farmers optimize their operations. This innovative platform combines modern technology with agricultural expertise to provide an all-in-one solution for farm management.",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "OpenAI API"],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dMtFDRtRp1fI12M0O4yWBxrEnAQZel.png"],
    githubLink: "https://github.com/yourusername/farmers-pad",
    liveLink: "https://farmers-pad.com",
    features: [
      "Interactive Dashboard",
      "Project Management",
      "AI-Powered Assistant",
      "Real-time Weather Monitoring",
      "Crop Calendar",
      "Market Price Tracking",
      "Equipment Management",
    ],
  },
  {
    id: 2,
    title: "MovieMatcher",
    description:
      "A personalized movie recommendation platform that helps users discover their next favorite films. Using advanced algorithms and user preferences, MovieMatcher provides tailored movie suggestions for an enhanced entertainment experience.",
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-28%20at%2022.30.51_36f8d982.jpg-KM9DHgq1Xag8BNiuiIEuOu2lv1jsfg.jpeg",
    ],
    githubLink: "https://github.com/yourusername/movie-matcher",
    liveLink: "https://movie-matcher.com",
    features: [
      "Personalized Movie Recommendations",
      "User Preference Settings",
      "Profile Management",
      "Movie Search & Discovery",
      "Clean & Modern Interface",
      "Responsive Design",
      "User Authentication",
    ],
  },
  {
    id: 3,
    title: "Rankify - Bus Management System",
    description:
      "A comprehensive bus fleet management system that provides real-time tracking, passenger management, and route optimization. Features an intuitive dashboard for monitoring bus status, passenger counts, and system alerts.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js", "Socket.io"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-19%20at%2021.41.53_2140a41d.jpg-n5iNTBe7DYsP3GITkFjMLnYzNmhtZw.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-raQ85h4ubVENbcTv7LP4IUgzrKLaq0.png",
    ],
    githubLink: "https://github.com/yourusername/rankify",
    liveLink: "https://rankify.com",
    features: [
      "Real-time Dashboard",
      "Bus Status Tracking",
      "Passenger Count Monitoring",
      "Route Management",
      "User Management System",
      "Audit Logging",
      "Database Management",
      "Subscription Management",
    ],
  },
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0])
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <section id="projects" className="projects futuristic-bg py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-primary text-3xl md:text-4xl mb-8 md:mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 rounded-md bg-background border border-input"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <div className="project-showcase">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCube]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            effect="cube"
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
            onSlideChange={(swiper) => setActiveProject(filteredProjects[swiper.activeIndex])}
            className="w-full max-w-4xl mx-auto"
          >
            {filteredProjects.map((project) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  className="project-card glass-effect p-4 md:p-8 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="project-images mb-6 md:mb-8">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={10}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                    >
                      {project.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className="relative w-full h-[200px] md:h-[400px]">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${project.title} screenshot ${index + 1}`}
                              fill
                              className="rounded-lg object-contain"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="project-info">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{project.title}</h3>
                    <p className="mb-4 text-muted-foreground text-sm md:text-base">{project.description}</p>
                    <div className="project-tech flex flex-wrap gap-2 mb-4 md:mb-6">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="tech-tag border border-primary px-2 md:px-3 py-1 rounded-full text-xs md:text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                      {project.features.map((feature, index) => (
                        <div key={index} className="feature-item flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full"></span>
                          <span className="text-muted-foreground text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="project-links flex flex-wrap gap-3 md:gap-4">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cyber-button text-sm md:text-base"
                      >
                        <i className="fab fa-github mr-2"></i> View Code
                      </a>
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cyber-button text-sm md:text-base"
                      >
                        <i className="fas fa-external-link-alt mr-2"></i> Live Demo
                      </a>
                      <button onClick={() => setShowModal(true)} className="cyber-button text-sm md:text-base">
                        <i className="fas fa-info-circle mr-2"></i> Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background p-4 md:p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl md:text-2xl font-bold">{activeProject.title}</h3>
                <button onClick={() => setShowModal(false)} className="cyber-button text-sm md:text-base">
                  Close
                </button>
              </div>
              <p className="mb-4 text-sm md:text-base">{activeProject.description}</p>
              <div className="mb-4">
                <h4 className="text-lg md:text-xl font-bold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1 md:space-y-2 text-sm md:text-base">
                  {activeProject.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="text-lg md:text-xl font-bold mb-2">Technologies Used:</h4>
                <ul className="list-disc list-inside space-y-1 md:space-y-2 text-sm md:text-base">
                  {activeProject.technologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setShowModal(false)} className="cyber-button text-sm md:text-base">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

