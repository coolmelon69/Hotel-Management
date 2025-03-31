"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    // Check on mount
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <div className="flex h-screen bg-muted/10">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} isMobile={isMobile} />

      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen && !isMobile ? "ml-64" : "ml-0"}`}>
        <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />

        <main className="p-4 md:p-6 overflow-auto h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  )
}

