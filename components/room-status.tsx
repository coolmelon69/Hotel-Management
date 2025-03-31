"use client"

import { DoorClosed } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RoomStatus() {
  // Room status data
  const roomData = {
    occupied: 35,
    available: 15,
    maintenance: 8,
    reserved: 22,
  }

  // total rooms and occupancy rate
  const totalRooms = roomData.occupied + roomData.available + roomData.maintenance + roomData.reserved
  const bookedRooms = roomData.occupied + roomData.reserved
  const bookedPercentage = Math.round((bookedRooms / totalRooms) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Room Status</CardTitle>
            <p className="text-sm text-muted-foreground">Current room availability</p>
          </div>
          <DoorClosed className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${bookedPercentage}%` }}></div>
              </div>
              <span className="text-sm font-medium">{bookedPercentage}%</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Occupied</span>
                <span className="text-sm font-medium">{roomData.occupied} rooms</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Available</span>
                <span className="text-sm font-medium">{roomData.available} rooms</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Maintenance</span>
                <span className="text-sm font-medium">{roomData.maintenance} rooms</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Reserved</span>
                <span className="text-sm font-medium">{roomData.reserved} rooms</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

