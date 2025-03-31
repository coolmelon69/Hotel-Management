"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  setSidebarOpen: (open: boolean) => void
}

export function MobileNav({ setSidebarOpen }: MobileNavProps) {
  return (
    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  )
}

