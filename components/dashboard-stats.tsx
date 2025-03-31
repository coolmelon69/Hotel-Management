"use client"

import { Calendar, DoorClosed, TrendingDown, TrendingUp, Users } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Booking } from "@/types/booking"

interface DashboardStatsProps {
  bookings: Booking[]
}

export function DashboardStats({ bookings }: DashboardStatsProps) {
  // Calculate stats from bookings
  const totalBookings = 188
  const availableRooms = 45
  const totalRooms = 100
  const occupancyRate = Math.round(((totalRooms - availableRooms) / totalRooms) * 100)
  const activeGuests = 58

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      change: "+12%",
      trend: "up",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      cardColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Available Rooms",
      value: `${availableRooms}/${totalRooms}`,
      change: `${occupancyRate}% occupancy rate`,
      trend: "neutral",
      icon: DoorClosed,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      cardColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Active Guests",
      value: activeGuests,
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/20",
      cardColor: "bg-amber-100 dark:bg-amber-900/20",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className={stat.cardColor}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {stat.trend === "neutral" ? (
                  <span>{stat.change}</span>
                ) : (
                  <span className={`flex items-center ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </span>
                )}
                {stat.trend !== "neutral" && " from last month"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

