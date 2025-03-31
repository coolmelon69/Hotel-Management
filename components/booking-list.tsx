"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, CheckCircle, Clock, DoorClosed, MoreHorizontal, Search, User, XCircle } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Booking } from "@/types/booking"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface BookingListProps {
  bookings: Booking[]
}

export function BookingList({ bookings }: BookingListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter bookings based on search query and active tab
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.roomNumber.includes(searchQuery) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "confirmed" && booking.status === "confirmed") ||
      (activeTab === "pending" && booking.status === "pending") ||
      (activeTab === "cancelled" && booking.status === "cancelled") ||
      (activeTab === "checked-in" && booking.status === "checked-in") ||
      (activeTab === "checked-out" && booking.status === "checked-out")

    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by guest, room, or booking ID..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>New Booking</Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="checked-in" className="col-span-2 sm:col-span-1">
            Checked In
          </TabsTrigger>
          <TabsTrigger value="checked-out" className="col-span-2 sm:col-span-1 md:col-span-1">
            Checked Out
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredBookings.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">No bookings found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface BookingCardProps {
  booking: Booking
}

function BookingCard({ booking }: BookingCardProps) {
  // Calculate number of nights
  const nights = Math.ceil(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24),
  )

  // Status configuration
  const statusConfig = {
    confirmed: {
      color: "bg-[#E9F7EE] text-[#28A745] border-[#28A745]/20 dark:bg-[#28A745]/20",
      icon: <CheckCircle className="h-3.5 w-3.5" />,
      label: "Confirmed",
      glow: "shadow-[0_0_8px_rgba(40,167,69,0.2)]",
    },
    pending: {
      color:
        "bg-gradient-to-r from-[#FFF8E6] to-[#FFF3DC] text-[#FFC107] border-[#FFC107]/20 dark:from-[#FFC107]/20 dark:to-[#FF9800]/20",
      icon: <Clock className="h-3.5 w-3.5" />,
      label: "Pending",
      glow: "",
    },
    cancelled: {
      color: "bg-[#FBEAEC] text-[#DC3545] border-[#DC3545]/20 dark:bg-[#DC3545]/20 dark:bg-opacity-60",
      icon: <XCircle className="h-3.5 w-3.5" />,
      label: "Cancelled",
      glow: "",
    },
    "checked-in": {
      color: "bg-[#E6F4FF] text-[#007BFF] border-[#007BFF]/20 dark:bg-[#007BFF]/20",
      icon: <CheckCircle className="h-3.5 w-3.5" />,
      label: "Checked In",
      glow: "shadow-[0_0_8px_rgba(0,123,255,0.2)]",
    },
    "checked-out": {
      color: "bg-[#F3EEFA] text-[#6F42C1] border-[#6F42C1]/20 dark:bg-[#6F42C1]/20",
      icon: <CheckCircle className="h-3.5 w-3.5" />,
      label: "Checked Out",
      glow: "",
    },
  }

  const status = statusConfig[booking.status as keyof typeof statusConfig]

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card
        className={cn(
          "overflow-hidden transition-all hover:shadow-md",
          booking.status === "confirmed" || booking.status === "checked-in" ? status.glow : "",
        )}
      >
        <CardContent className="p-0">
          <div className="p-4 border-b">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{booking.guestName}</h3>
              <Badge
                variant="outline"
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                  status.color,
                )}
              >
                {status.icon}
                {status.label}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="inline-flex items-center">
                <User className="h-3.5 w-3.5 mr-1" />
                {booking.guestCount} {booking.guestCount === 1 ? "Guest" : "Guests"}
              </span>
              <span className="mx-2">•</span>
              <span className="inline-flex items-center">
                <DoorClosed className="h-3.5 w-3.5 mr-1" />
                Room {booking.roomNumber}
              </span>
            </div>
          </div>

          <div className="p-4 bg-muted/30">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Check-in</p>
                <p className="text-sm font-medium flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                  {format(new Date(booking.checkIn), "MMM d, yyyy")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Check-out</p>
                <p className="text-sm font-medium flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                  {format(new Date(booking.checkOut), "MMM d, yyyy")}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Booking #{booking.id} • {nights} {nights === 1 ? "night" : "nights"}
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    View Details
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                      <DropdownMenuItem>Send Confirmation</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Cancel Booking</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

