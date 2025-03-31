import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, DoorClosed, Users, UserCog, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function DashboardContent() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3" /> 12%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
              <DoorClosed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24/50</div>
              <p className="text-xs text-muted-foreground mt-1">48% occupancy rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3" /> 8%
                </span>
                from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staff on Duty</CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-rose-500 flex items-center">
                  <ArrowDownRight className="h-3 w-3" /> 2
                </span>
                from yesterday
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>You have 6 new bookings today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 rounded-md border p-3">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Guest {i}</p>
                      <p className="text-sm text-muted-foreground">
                        Room {100 + i} • {i % 2 === 0 ? "Check-in" : "Check-out"} • {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`text-xs font-medium ${i % 2 === 0 ? "text-emerald-500" : "text-amber-500"}`}>
                      {i % 2 === 0 ? "Confirmed" : "Pending"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Room Status</CardTitle>
              <CardDescription>Current room availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Occupied</span>
                    <span className="text-sm font-medium">35 rooms</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Available</span>
                    <span className="text-sm font-medium">15 rooms</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Maintenance</span>
                    <span className="text-sm font-medium">3 rooms</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Reserved</span>
                    <span className="text-sm font-medium">7 rooms</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="h-[400px] flex items-center justify-center border rounded-md">
        <p className="text-muted-foreground">Analytics content would go here</p>
      </TabsContent>
      <TabsContent value="reports" className="h-[400px] flex items-center justify-center border rounded-md">
        <p className="text-muted-foreground">Reports content would go here</p>
      </TabsContent>
    </Tabs>
  )
}

