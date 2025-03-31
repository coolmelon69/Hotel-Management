"use client"

import { useState } from "react"
import { Calendar, CheckCircle, Clock, DoorClosed, Filter, Search, User, XCircle } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample booking data
const bookings = [
  {
    id: "B001",
    guestName: "James Wilson",
    roomNumber: "204",
    checkIn: new Date("2023-06-15"),
    checkOut: new Date("2023-06-20"),
    status: "confirmed",
    guestCount: 2,
    paymentStatus: "paid",
    specialRequests: "Early check-in requested",
  },
  {
    id: "B002",
    guestName: "Sarah Johnson",
    roomNumber: "315",
    checkIn: new Date("2023-06-16"),
    checkOut: new Date("2023-06-19"),
    status: "pending",
    guestCount: 1,
    paymentStatus: "partial",
    specialRequests: "",
  },
  {
    id: "B003",
    guestName: "Michael Brown",
    roomNumber: "118",
    checkIn: new Date("2023-06-14"),
    checkOut: new Date("2023-06-21"),
    status: "confirmed",
    guestCount: 3,
    paymentStatus: "paid",
    specialRequests: "High floor preferred",
  },
  {
    id: "B004",
    guestName: "Emily Davis",
    roomNumber: "422",
    checkIn: new Date("2023-06-17"),
    checkOut: new Date("2023-06-22"),
    status: "cancelled",
    guestCount: 2,
    paymentStatus: "refunded",
    specialRequests: "",
  },
  {
    id: "B005",
    guestName: "Robert Martinez",
    roomNumber: "506",
    checkIn: new Date("2023-06-15"),
    checkOut: new Date("2023-06-18"),
    status: "confirmed",
    guestCount: 4,
    paymentStatus: "paid",
    specialRequests: "Connecting rooms requested",
  },
  {
    id: "B006",
    guestName: "Jennifer Taylor",
    roomNumber: "201",
    checkIn: new Date("2023-06-16"),
    checkOut: new Date("2023-06-23"),
    status: "pending",
    guestCount: 2,
    paymentStatus: "awaiting",
    specialRequests: "",
  },
  {
    id: "B007",
    guestName: "David Anderson",
    roomNumber: "310",
    checkIn: new Date("2023-06-18"),
    checkOut: new Date("2023-06-20"),
    status: "confirmed",
    guestCount: 1,
    paymentStatus: "paid",
    specialRequests: "Late check-out requested",
  },
  {
    id: "B008",
    guestName: "Lisa Thomas",
    roomNumber: "415",
    checkIn: new Date("2023-06-19"),
    checkOut: new Date("2023-06-25"),
    status: "confirmed",
    guestCount: 2,
    paymentStatus: "paid",
    specialRequests: "",
  },
]

export default function BookingDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter bookings based on search query and status filter
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.roomNumber.includes(searchQuery) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Booking Management</h1>
        <p className="text-muted-foreground">View and manage upcoming hotel bookings</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by guest, room, or booking ID..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="mb-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="current">Current Stays</TabsTrigger>
          <TabsTrigger value="past">Past Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No bookings found matching your criteria</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="current">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Current stays would be displayed here</p>
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Past bookings would be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface BookingCardProps {
  booking: {
    id: string
    guestName: string
    roomNumber: string
    checkIn: Date
    checkOut: Date
    status: string
    guestCount: number
    paymentStatus: string
    specialRequests: string
  }
}

function BookingCard({ booking }: BookingCardProps) {
  // Calculate number of nights
  const nights = Math.ceil((booking.checkOut.getTime() - booking.checkIn.getTime()) / (1000 * 60 * 60 * 24))

  // Status badge styling
  const statusConfig = {
    confirmed: {
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: <CheckCircle className="h-3.5 w-3.5" />,
      label: "Confirmed",
    },
    pending: {
      color: "bg-amber-100 text-amber-800 border-amber-200",
      icon: <Clock className="h-3.5 w-3.5" />,
      label: "Pending",
    },
    cancelled: {
      color: "bg-rose-100 text-rose-800 border-rose-200",
      icon: <XCircle className="h-3.5 w-3.5" />,
      label: "Cancelled",
    },
  }

  const status = statusConfig[booking.status as keyof typeof statusConfig]

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">{booking.guestName}</h3>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.color}`}
            >
              {status.icon}
              {status.label}
            </span>
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
                {format(booking.checkIn, "MMM d, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Check-out</p>
              <p className="text-sm font-medium flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                {format(booking.checkOut, "MMM d, yyyy")}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Booking #{booking.id} • {nights} {nights === 1 ? "night" : "nights"}
              </span>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

