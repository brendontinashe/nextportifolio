"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import type React from "react"
import { useEffect, useState } from "react"

interface SectionWrapperProps {
  children: React.ReactNode
  id: string
  bgClass: string
}

export default function SectionWrapper({ children, id, bgClass }: SectionWrapperProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-10% 0px -10% 0px",
  })

  const [stars, setStars] = useState<{ top: string; left: string; size: string }[]>([])

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
    }))
    setStars(newStars)
  }, [])

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`section-wrapper ${bgClass}`}
    >
      <div className="star-field">
        {stars.map((star, index) => (
          <div
            key={index}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </motion.section>
  )
}

