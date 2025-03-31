"use client"

import { motion } from "framer-motion"
import { BookingList } from "@/components/booking-list"
import { bookingsData } from "@/data/bookings"

export function BookingsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Bookings</h1>
      <p className="mb-6 text-muted-foreground">Manage all your hotel bookings in one place</p>

      <BookingList bookings={bookingsData} />
    </motion.div>
  )
}

