export interface Booking {
  id: string
  guestName: string
  roomNumber: string
  checkIn: string
  checkOut: string
  status: "confirmed" | "pending" | "cancelled" | "checked-in" | "checked-out"
  guestCount: number
  paymentStatus: string
  specialRequests?: string
}

