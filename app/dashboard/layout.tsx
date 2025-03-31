import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { redirect } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }) {
  // This is a client component, so we need to check auth on the client side
  if (typeof window !== "undefined") {
    const isLoggedIn = localStorage.getItem("authToken") === "loggedIn"
    if (!isLoggedIn) {
      redirect("/")
    }
  }

  return <DashboardLayout>{children}</DashboardLayout>
}

