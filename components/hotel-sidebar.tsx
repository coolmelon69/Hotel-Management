"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  DoorClosed,
  Users,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  BarChart3,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMobile } from "@/hooks/use-mobile"

interface HotelSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function HotelSidebar({ open, setOpen }: HotelSidebarProps) {
  const pathname = usePathname()
  const isMobile = useMobile()

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      title: "Bookings",
      href: "/bookings",
      icon: Calendar,
    },
    {
      title: "Rooms",
      href: "/rooms",
      icon: DoorClosed,
    },
    {
      title: "Guests",
      href: "/guests",
      icon: Users,
    },
    {
      title: "Staff",
      href: "/staff",
      icon: UserCog,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: BarChart3,
    },
    {
      title: "Billing",
      href: "/billing",
      icon: CreditCard,
    },
  ]

  const utilityNavItems = [
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      href: "/help",
      icon: HelpCircle,
    },
  ]

  const toggleSidebar = () => {
    setOpen(!open)
  }

  // If mobile and sidebar is open, add overlay
  if (isMobile && open) {
    return (
      <>
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r shadow-lg">
          <SidebarContent
            pathname={pathname}
            mainNavItems={mainNavItems}
            utilityNavItems={utilityNavItems}
            toggleSidebar={toggleSidebar}
            open={open}
          />
        </div>
      </>
    )
  }

  return (
    <div
      className={cn(
        "h-screen bg-background border-r transition-all duration-300 ease-in-out",
        open ? "w-64" : "w-[70px]",
        isMobile && !open ? "hidden" : "",
        "fixed left-0 top-0 z-30",
      )}
    >
      <SidebarContent
        pathname={pathname}
        mainNavItems={mainNavItems}
        utilityNavItems={utilityNavItems}
        toggleSidebar={toggleSidebar}
        open={open}
      />
    </div>
  )
}

interface SidebarContentProps {
  pathname: string
  mainNavItems: { title: string; href: string; icon: any }[]
  utilityNavItems: { title: string; href: string; icon: any }[]
  toggleSidebar: () => void
  open: boolean
}

function SidebarContent({ pathname, mainNavItems, utilityNavItems, toggleSidebar, open }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          {open ? (
            <>
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">HM</span>
              </div>
              <span className="font-semibold text-lg">Hotel Manager</span>
            </>
          ) : (
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">HM</span>
            </div>
          )}
        </Link>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8">
            {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {mainNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                !open && "justify-center",
              )}
            >
              <item.icon className="h-5 w-5" />
              {open && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
        <div className="mt-4">
          <div className={cn("px-4 py-2", open ? "block" : "hidden")}>
            <h3 className="text-xs font-semibold text-muted-foreground">Settings</h3>
          </div>
          <nav className="grid gap-1 px-2">
            {utilityNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                  !open && "justify-center",
                )}
              >
                <item.icon className="h-5 w-5" />
                {open && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
            !open && "justify-center",
          )}
        >
          <LogOut className="h-5 w-5" />
          {open && <span>Log out</span>}
        </Button>
      </div>
    </div>
  )
}

