"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { HotelSidebar } from "@/components/hotel-sidebar"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { useMobile } from "@/hooks/use-mobile"

export function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  return (
    <div className="flex min-h-screen bg-muted/20">
      <HotelSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div
        className={`flex flex-1 flex-col ${sidebarOpen && !isMobile ? "ml-64" : "ml-0"} transition-all duration-300 ease-in-out`}
      >
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          {isMobile && <MobileNav setSidebarOpen={setSidebarOpen} />}
          <div className="flex flex-1 items-center justify-end">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

