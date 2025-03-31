"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function GuestsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Guest Management</h1>
      <p className="mb-6 text-muted-foreground">View and manage all guest information</p>

      <Card>
        <CardHeader>
          <CardTitle>Guest Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Guest management content would go here</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

