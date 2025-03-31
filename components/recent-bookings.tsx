"use client"

import { format } from "date-fns"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Booking } from "@/types/booking"

interface RecentBookingsProps {
  bookings: Booking[]
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  const router = useRouter()
  // Get only the first 3 bookings for display
  const recentBookings = bookings.slice(0, 3)

  const handleViewAllBookings = () => {
    router.push("/dashboard/bookings")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <p className="text-sm text-muted-foreground">Welcome to your hotel management dashboard</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{booking.guestName}</h3>
                  <span
                    className={`text-sm font-medium ${
                      booking.status === "confirmed" || booking.status === "checked-in"
                        ? "text-green-500"
                        : booking.status === "pending"
                          ? "text-amber-500"
                          : "text-red-500"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Room {booking.roomNumber} • Check-out • {format(new Date(booking.checkOut), "MM/dd/yyyy")}
                  </p>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <Button variant="outline" size="sm" className="w-full" onClick={handleViewAllBookings}>
            Show All Bookings
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

