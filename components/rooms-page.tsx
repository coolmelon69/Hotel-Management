"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RoomsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Rooms Management</h1>
      <p className="mb-6 text-muted-foreground">View and manage all rooms in your hotel</p>

      <Card>
        <CardHeader>
          <CardTitle>Room Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Room management content would go here</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

