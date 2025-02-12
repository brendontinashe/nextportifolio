"use client"

import { useState, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls, Line, Billboard } from "@react-three/drei"
import type * as THREE from "three"

interface Skill {
  name: string
  level: number
  category: string
}

const skills: Skill[] = [
  { name: "React", level: 90, category: "Frontend" },
  { name: "Next.js", level: 85, category: "Frontend" },
  { name: "TypeScript", level: 80, category: "Frontend" },
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "Express", level: 80, category: "Backend" },
  { name: "MongoDB", level: 75, category: "Backend" },
  { name: "Python", level: 70, category: "Backend" },
  { name: "Docker", level: 65, category: "DevOps" },
  { name: "AWS", level: 60, category: "DevOps" },
  { name: "Git", level: 85, category: "DevOps" },
]

function SkillNode({ position, name, color }: { position: [number, number, number]; name: string; color: string }) {
  return (
    <group position={position}>
      <Billboard>
        <Text
          color={color}
          fontSize={0.12}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="/fonts/Geist-Bold.ttf"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {name}
        </Text>
      </Billboard>
      <mesh>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function SkillsNetwork({ activeCategory }: { activeCategory: string }) {
  const groupRef = useRef<THREE.Group>(null)

  const skillsWithPositions = useMemo(() => {
    return skills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length)
      const theta = Math.sqrt(skills.length * Math.PI) * phi
      return {
        ...skill,
        position: [
          1.5 * Math.cos(theta) * Math.sin(phi),
          1.5 * Math.sin(theta) * Math.sin(phi),
          1.5 * Math.cos(phi),
        ] as [number, number, number],
      }
    })
  }, [])

  const connections = useMemo(() => {
    const lines: Array<{ start: [number, number, number]; end: [number, number, number] }> = []
    for (let i = 0; i < skillsWithPositions.length; i++) {
      for (let j = i + 1; j < skillsWithPositions.length; j++) {
        if (skillsWithPositions[i].category === skillsWithPositions[j].category || activeCategory === "All") {
          lines.push({
            start: skillsWithPositions[i].position,
            end: skillsWithPositions[j].position,
          })
        }
      }
    }
    return lines
  }, [skillsWithPositions, activeCategory])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  const filteredSkills =
    activeCategory === "All"
      ? skillsWithPositions
      : skillsWithPositions.filter((skill) => skill.category === activeCategory)

  return (
    <group ref={groupRef}>
      {connections.map((connection, i) => (
        <Line
          key={i}
          points={[connection.start, connection.end]}
          color="#00f3ff"
          lineWidth={0.5}
          opacity={0.2}
          transparent
        />
      ))}

      {filteredSkills.map((skill) => (
        <SkillNode
          key={skill.name}
          position={skill.position}
          name={skill.name}
          color={skill.category === "Frontend" ? "#00f3ff" : skill.category === "Backend" ? "#ff2957" : "#b24fff"}
        />
      ))}
    </group>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <section id="skills" className="skills futuristic-bg py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-primary text-3xl mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <i className="fas fa-laptop-code mr-2"></i> Technical Arsenal
        </motion.h2>

        <div className="mb-6 flex justify-center gap-4 flex-wrap">
          {["All", "Frontend", "Backend", "DevOps"].map((category) => (
            <motion.button
              key={category}
              className={`cyber-button text-sm ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="w-full h-[400px] relative bg-darker-bg rounded-lg overflow-hidden">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <fog attach="fog" args={["#000000", 5, 10]} />
            <SkillsNetwork activeCategory={activeCategory} />
            <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 4} maxPolarAngle={(Math.PI * 3) / 4} />
          </Canvas>

          <div className="absolute bottom-2 left-2 flex gap-2 bg-black bg-opacity-50 p-2 rounded-lg">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: "#00f3ff" }}></div>
              <span className="text-xs">Frontend</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: "#ff2957" }}></div>
              <span className="text-xs">Backend</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: "#b24fff" }}></div>
              <span className="text-xs">DevOps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

