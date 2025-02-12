"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
    setFormErrors((prevState) => ({ ...prevState, [name]: "" }))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { name: "", email: "", message: "" }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
      isValid = false
    }

    setFormErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    // Here you would typically send the form data to your server
    // For this example, we'll simulate an API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      setSubmitMessage("Thank you for your message. I'll get back to you soon!")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setSubmitMessage("Oops! Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact futuristic-bg py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-primary text-4xl mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Send className="inline-block mr-2" /> Initialize Contact
        </motion.h2>
        <div className="contact-content flex flex-col md:flex-row gap-12">
          <motion.div
            className="contact-info flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="contact-item flex items-center mb-6">
              <Mail className="text-primary mr-4 w-6 h-6" />
              <p>brendon@example.com</p>
            </div>
            <div className="contact-item flex items-center mb-6">
              <MapPin className="text-primary mr-4 w-6 h-6" />
              <p>Harare, Zimbabwe</p>
            </div>
            <div className="contact-item flex items-center mb-6">
              <Phone className="text-primary mr-4 w-6 h-6" />
              <p>+263778425353</p>
            </div>
          </motion.div>
          <motion.form
            className="contact-form flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-muted-foreground mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 bg-background rounded border border-input focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-muted-foreground mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 bg-background rounded border border-input focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-muted-foreground mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 bg-background rounded border border-input focus:border-primary focus:ring-1 focus:ring-primary"
                required
              ></textarea>
              {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
            </div>
            <button type="submit" className="cyber-button w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  <Send className="inline-block mr-2" /> Send Message
                </>
              )}
            </button>
            {submitMessage && (
              <p className={`mt-4 text-center ${submitMessage.includes("Oops") ? "text-red-500" : "text-green-500"}`}>
                {submitMessage}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

