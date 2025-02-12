import { motion } from "framer-motion"

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-dark-bg flex items-center justify-center z-50">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-4 neon-text"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Initializing...
        </motion.h2>
        <motion.div
          className="w-16 h-16 border-t-4 border-neon-blue rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.p
          className="mt-4 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Loading components...
        </motion.p>
      </motion.div>
    </div>
  )
}

