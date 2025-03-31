"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  BarChart3,
  Calendar,
  ChevronLeft,
  CreditCard,
  DoorClosed,
  HelpCircle,
  Home,
  Hotel,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DashboardSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
}

export function DashboardSidebar({ open, setOpen, isMobile }: DashboardSidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
    { name: "Rooms", href: "/dashboard/rooms", icon: DoorClosed },
    { name: "Guests", href: "/dashboard/guests", icon: Users },
    { name: "Staff", href: "/dashboard/staff", icon: Users },
    { name: "Report", href: "/dashboard/report", icon: BarChart3 },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  ]

  const bottomNavItems = [
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  // If mobile and sidebar is open, add overlay
  if (isMobile && open) {
    return (
      <>
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-background"
        >
          <SidebarContent navItems={navItems} bottomNavItems={bottomNavItems} pathname={pathname} setOpen={setOpen} />
        </motion.div>
      </>
    )
  }

  // If sidebar is closed on desktop, show a small toggle button
  if (!open && !isMobile) {
    return (
      <>
        <div className="fixed inset-y-0 left-0 z-30 w-[70px] border-r bg-background">
          <div className="flex h-16 items-center justify-center border-b">
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-col items-center py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-md my-1",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                title={item.name}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 border-r bg-background transition-all duration-300 ease-in-out",
        open ? "w-64" : "w-0",
      )}
    >
      {open && (
        <SidebarContent navItems={navItems} bottomNavItems={bottomNavItems} pathname={pathname} setOpen={setOpen} />
      )}
    </div>
  )
}

interface SidebarContentProps {
  navItems: { name: string; href: string; icon: React.ElementType }[]
  bottomNavItems: { name: string; href: string; icon: React.ElementType }[]
  pathname: string
  setOpen: (open: boolean) => void
  collapsed?: boolean
}

function SidebarContent({ navItems, bottomNavItems, pathname, setOpen, collapsed = false }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Hotel className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && <span className="text-lg font-semibold">Hotel Management</span>}
        </Link>
        {!collapsed && (
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-0",
              )}
            >
              <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-primary" : "")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t py-2">
        <nav className="grid gap-1 px-2">
          {bottomNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-0",
              )}
            >
              <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-primary" : "")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        <div className="px-2 pt-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
              collapsed && "justify-center",
            )}
            onClick={() => {
              // Simulate logout
              window.location.href = "/"
            }}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Log out</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}

