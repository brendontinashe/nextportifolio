import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "../components/ThemeProvider"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Brendon Buwerimwe | Future-Forward Developer",
  description: "Portfolio of Brendon Buwerimwe, a Full-Stack Developer",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'