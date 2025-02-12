"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Award, Calendar, Building2, ExternalLink, Download } from "lucide-react"
import { pdfjs } from "react-pdf"

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface Certificate {
  id: number
  title: string
  issueDate: string
  issuer: string
  fileName: string
}

// Static certificates data
const certificatesData: Certificate[] = [
  {
    id: 1,
    title: "Essentials in Python",
    issueDate: "2024-03-25",
    issuer: "Python.org",
    fileName: "python-essentials.pdf",
  },
  {
    id: 2,
    title: "Introduction to Cyber Security",
    issueDate: "2024-03-29",
    issuer: "Cisco",
    fileName: "cyber-security-intro.pdf",
  },
  {
    id: 3,
    title: "Foundational C# with Microsoft",
    issueDate: "2024-03-29",
    issuer: "Microsoft",
    fileName: "csharp-foundations.pdf",
  },
  {
    id: 4,
    title: "Cyber Threat Management",
    issueDate: "2024-03-29",
    issuer: "Cisco",
    fileName: "cyber-threat-management.pdf",
  },
]

export default function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [showModal, setShowModal] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDownload = (certificate: Certificate) => {
    // In a real application, this would download the actual PDF file
    console.log(`Downloading certificate: ${certificate.fileName}`)
    // You would implement actual download functionality here
  }

  return (
    <section id="certificates" className="certificates futuristic-bg py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="neon-text text-3xl md:text-4xl mb-8 md:mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Award className="inline-block mr-2 w-6 h-6 md:w-8 md:h-8" /> Certifications
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {certificatesData.map((cert) => (
            <motion.div
              key={cert.id}
              className="certificate-card glass-effect p-4 md:p-6 rounded-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setSelectedCertificate(cert)
                setShowModal(true)
              }}
            >
              <h3 className="text-lg md:text-xl font-bold mb-2">{cert.title}</h3>
              <div className="flex items-center text-gray-300 mb-2 text-sm md:text-base">
                <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
                <p>{cert.issuer}</p>
              </div>
              <div className="flex items-center text-gray-300 mb-4 text-sm md:text-base">
                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                <p>{formatDate(cert.issueDate)}</p>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(cert)
                  }}
                  className="cyber-button text-xs md:text-sm py-2"
                >
                  <Download className="w-4 h-4 mr-1 inline-block" />
                  Download
                </button>
                <button className="cyber-button text-xs md:text-sm py-2">
                  <ExternalLink className="w-4 h-4 mr-1 inline-block" />
                  View
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      {showModal && selectedCertificate && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="bg-dark-bg p-4 md:p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl md:text-2xl font-bold">{selectedCertificate.title}</h3>
              <button onClick={() => setShowModal(false)} className="cyber-button text-sm md:text-base">
                Close
              </button>
            </div>
            <div className="mb-4 space-y-2">
              <p className="text-gray-300 text-sm md:text-base">
                <Building2 className="inline-block mr-2 w-4 h-4" />
                Issued by: {selectedCertificate.issuer}
              </p>
              <p className="text-gray-300 text-sm md:text-base">
                <Calendar className="inline-block mr-2 w-4 h-4" />
                Issue Date: {formatDate(selectedCertificate.issueDate)}
              </p>
            </div>
            <div className="certificate-viewer bg-white rounded-lg overflow-hidden mb-4">
              <div className="w-full h-64 md:h-96 flex items-center justify-center bg-gray-100 text-gray-500">
                Certificate Preview Placeholder
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={() => handleDownload(selectedCertificate)} className="cyber-button text-sm md:text-base">
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </button>
              <button onClick={() => setShowModal(false)} className="cyber-button text-sm md:text-base">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

