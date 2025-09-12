"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CanteenSidebar } from "@/components/canteen-sidebar"
import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  IndianRupee,
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  CookingPot,
  Truck,
  ShoppingCart,
  Calendar,
  TrendingUp
} from "lucide-react"

export default function CanteenOrdersPage() {
  const currentOrders = [
    {
      id: "#ORD-2024-0092",
      customer: "Arjun Patel",
      studentId: "CS2021045",
      items: [
        { name: "Chicken Biryani", quantity: 1, price: 120 },
        { name: "Fresh Lime Soda", quantity: 1, price: 25 }
      ],
      total: 145,
      orderTime: "2:45 PM",
      estimatedTime: "3:15 PM",
      status: "preparing",
      paymentMethod: "UPI",
      priority: "normal"
    },
    {
      id: "#ORD-2024-0091",
      customer: "Sneha Sharma",
      studentId: "CS2021067",
      items: [
        { name: "Paneer Butter Masala", quantity: 1, price: 95 }
      ],
      total: 95,
      orderTime: "2:42 PM",
      estimatedTime: "3:05 PM",
      status: "cooking",
      paymentMethod: "Cash",
      priority: "normal"
    },
    {
      id: "#ORD-2024-0090",
      customer: "Rahul Kumar",
      studentId: "CS2021023",
      items: [
        { name: "Masala Dosa", quantity: 2, price: 45 },
        { name: "Samosa", quantity: 4, price: 20 }
      ],
      total: 170,
      orderTime: "2:38 PM",
      estimatedTime: "3:00 PM",
      status: "ready",
      paymentMethod: "UPI",
      priority: "high"
    },
    {
      id: "#ORD-2024-0089",
      customer: "Priya Singh",
      studentId: "CS2021055",
      items: [
        { name: "Chole Bhature", quantity: 1, price: 75 },
        { name: "Lassi", quantity: 1, price: 35 }
      ],
      total: 110,
      orderTime: "2:35 PM",
      estimatedTime: "2:55 PM",
      status: "served",
      paymentMethod: "UPI",
      priority: "normal"
    }
  ]

  const historicalOrders = [
    {
      id: "#ORD-2024-0088",
      customer: "Amit Mehta",
      studentId: "CS2021012",
      items: ["Chicken Biryani x2", "Fresh Lime Soda x2"],
      total: 290,
      orderDate: "2024-01-16",
      orderTime: "1:20 PM",
      status: "completed",
      paymentMethod: "UPI",
      rating: 4.5
    },
    {
      id: "#ORD-2024-0087",
      customer: "Kavya Reddy",
      studentId: "CS2021089",
      items: ["Paneer Butter Masala", "Naan x2"],
      total: 135,
      orderDate: "2024-01-16",
      orderTime: "12:45 PM",
      status: "completed",
      paymentMethod: "Cash",
      rating: 5.0
    },
    {
      id: "#ORD-2024-0086",
      customer: "Rohit Gupta",
      studentId: "CS2021034",
      items: ["Vada Pav x3", "Chai x2"],
      total: 130,
      orderDate: "2024-01-16",
      orderTime: "11:30 AM",
      status: "completed",
      paymentMethod: "UPI",
      rating: 4.0
    },
    {
      id: "#ORD-2024-0085",
      customer: "Anisha Jain",
      studentId: "CS2021076",
      items: ["Masala Dosa", "Filter Coffee"],
      total: 70,
      orderDate: "2024-01-15",
      orderTime: "2:15 PM",
      status: "cancelled",
      paymentMethod: "UPI",
      reason: "Student request"
    },
    {
      id: "#ORD-2024-0084",
      customer: "Vikash Singh",
      studentId: "CS2021091",
      items: ["Rajma Rice", "Buttermilk"],
      total: 85,
      orderDate: "2024-01-15",
      orderTime: "1:45 PM",
      status: "completed",
      paymentMethod: "Cash",
      rating: 4.2
    }
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      preparing: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      cooking: "bg-orange-500/10 border-orange-500/30 text-orange-400",
      ready: "bg-[#e78a53]/10 border-[#e78a53]/30 text-[#e78a53]",
      served: "bg-green-500/10 border-green-500/30 text-green-400",
      completed: "bg-green-500/10 border-green-500/30 text-green-400",
      cancelled: "bg-red-500/10 border-red-500/30 text-red-400"
    }
    return colors[status as keyof typeof colors] || "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      preparing: <Clock className="h-4 w-4" />,
      cooking: <CookingPot className="h-4 w-4" />,
      ready: <CheckCircle className="h-4 w-4" />,
      served: <Truck className="h-4 w-4" />,
      completed: <CheckCircle className="h-4 w-4" />,
      cancelled: <XCircle className="h-4 w-4" />
    }
    return icons[status as keyof typeof icons] || <ClipboardList className="h-4 w-4" />
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "bg-red-500/10 border-red-500/30 text-red-400",
      normal: "bg-zinc-500/10 border-zinc-500/30 text-zinc-400",
      low: "bg-blue-500/10 border-blue-500/30 text-blue-400"
    }
    return colors[priority as keyof typeof colors] || "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"
  }

  // Calculate stats
  const pendingOrders = currentOrders.filter(order => ['preparing', 'cooking'].includes(order.status)).length
  const readyOrders = currentOrders.filter(order => order.status === 'ready').length
  const todayRevenue = historicalOrders
    .filter(order => order.orderDate === "2024-01-16" && order.status === "completed")
    .reduce((sum, order) => sum + order.total, 0)
  const avgOrderValue = historicalOrders
    .filter(order => order.status === "completed")
    .reduce((sum, order) => sum + order.total, 0) / historicalOrders.filter(order => order.status === "completed").length

  return (
    <div className="min-h-screen bg-black flex">
      <CanteenSidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="bg-zinc-900/30 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Order Management</h1>
                <p className="text-zinc-400">Manage current orders and view order history</p>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                  <Input 
                    placeholder="Search orders..."
                    className="pl-10 w-64 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Order Stats */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Order Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Clock className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{pendingOrders}</p>
                      <p className="text-zinc-400 text-sm">Pending Orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-[#e78a53]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{readyOrders}</p>
                      <p className="text-zinc-400 text-sm">Ready to Serve</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                      <IndianRupee className="h-6 w-6 text-[#e78a53]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">₹{todayRevenue.toLocaleString()}</p>
                      <p className="text-zinc-400 text-sm">Today's Revenue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-[#e78a53]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">₹{Math.round(avgOrderValue)}</p>
                      <p className="text-zinc-400 text-sm">Avg Order Value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Current Orders Queue */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Current Orders Queue</h2>
              <Badge className="bg-[#e78a53]/10 border-[#e78a53]/30 text-[#e78a53]">
                {currentOrders.length} Active Orders
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentOrders.map((order) => (
                <Card key={order.id} className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70 transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-lg">{order.id}</CardTitle>
                        <p className="text-zinc-400 text-sm">{order.customer} • {order.studentId}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority}
                        </Badge>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Order Items */}
                      <div>
                        <h4 className="text-zinc-300 font-medium mb-2">Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-zinc-300">{item.name} x{item.quantity}</span>
                              <span className="text-[#e78a53]">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                        <div>
                          <p className="text-zinc-400 text-sm">Ordered: {order.orderTime}</p>
                          <p className="text-zinc-400 text-sm">Est. Ready: {order.estimatedTime}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#e78a53] font-bold text-lg">₹{order.total}</p>
                          <p className="text-zinc-400 text-sm">{order.paymentMethod}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        {order.status === 'preparing' && (
                          <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                            <CookingPot className="h-4 w-4 mr-2" />
                            Start Cooking
                          </Button>
                        )}
                        {order.status === 'cooking' && (
                          <Button size="sm" className="flex-1 bg-[#e78a53] hover:bg-[#e78a53]/90">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Ready
                          </Button>
                        )}
                        {order.status === 'ready' && (
                          <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                            <Truck className="h-4 w-4 mr-2" />
                            Mark Served
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-400">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Historical Orders */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Order History</CardTitle>
                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Filter by Date
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Order ID</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Customer</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Items</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Date & Time</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Amount</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Status</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Rating</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalOrders.map((order) => (
                      <tr key={order.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                        <td className="py-4 px-4">
                          <p className="text-white font-medium">{order.id}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-white">{order.customer}</p>
                            <p className="text-zinc-400 text-sm">{order.studentId}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-zinc-300 text-sm">{order.items.join(", ")}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-white">{order.orderDate}</p>
                            <p className="text-zinc-400 text-sm">{order.orderTime}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-[#e78a53] font-semibold">₹{order.total}</p>
                            <p className="text-zinc-500 text-xs">{order.paymentMethod}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          {order.status === 'completed' && order.rating ? (
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400">★</span>
                              <span className="text-white">{order.rating}</span>
                            </div>
                          ) : order.status === 'cancelled' ? (
                            <p className="text-red-400 text-xs">{order.reason}</p>
                          ) : (
                            <span className="text-zinc-500">-</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-400">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
