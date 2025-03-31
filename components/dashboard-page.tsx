"use client"

import { motion } from "framer-motion"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentBookings } from "@/components/recent-bookings"
import { RoomStatus } from "@/components/room-status"
import { bookingsData } from "@/data/bookings"

export function DashboardPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Dashboard Overview</h1>
      <p className="mb-6 text-muted-foreground">Welcome to your hotel management dashboard</p>

      <DashboardStats bookings={bookingsData} />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <RecentBookings bookings={bookingsData} />
        <RoomStatus />
      </div>
    </motion.div>
  )
}

