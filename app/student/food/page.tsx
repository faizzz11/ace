"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StudentSidebar } from "@/components/student-sidebar"
import { UserMenu } from "@/components/user-menu"
import {
  Clock,
  Star,
  Timer,
  ShoppingCart,
  Calendar,
  IndianRupee,
  Leaf,
  Flame,
  Filter,
  Search,
  Bell,
  Camera,
  Store
} from "lucide-react"
import { Input } from "@/components/ui/input"

interface MenuItem {
  _id: string
  name: string
  description: string
  price: number
  category: string
  image: string | null
  isVeg: boolean
  isSpicy: boolean
  prepTime: number
  rating: number
  isAvailable: boolean
  canteenName: string
  canteenId: string
}

export default function StudentFoodPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Fetch menu items from API
  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/menu/available')
      const result = await response.json()
      
      if (response.ok) {
        setMenuItems(result.data || [])
      } else {
        console.error('Error fetching menu items:', result.error)
        alert('Error loading menu items: ' + result.error)
      }
    } catch (error) {
      console.error('Error fetching menu items:', error)
      alert('Error loading menu items. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Get unique categories from menu items
  const categories = ["All", ...Array.from(new Set(menuItems.map(item => item.category)))]

  // Filter menu items based on search and category
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.canteenName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // Calculate stats
  const stats = {
    totalItems: menuItems.length,
    availableItems: menuItems.filter(item => item.isAvailable).length,
    avgRating: menuItems.length > 0 ? (menuItems.reduce((sum, item) => sum + item.rating, 0) / menuItems.length).toFixed(1) : "0",
    avgPrepTime: menuItems.length > 0 ? Math.round(menuItems.reduce((sum, item) => sum + item.prepTime, 0) / menuItems.length) : 0,
    canteenCount: new Set(menuItems.map(item => item.canteenId)).size
  }

  // Sample recent orders data (this would come from an orders API in a real app)
  const recentOrders = [
    {
      id: "1234",
      items: [
        { name: "Chicken Biryani", quantity: 1, price: 120 },
        { name: "Fresh Lime Soda", quantity: 1, price: 25 }
      ],
      total: 145,
      date: "Yesterday, 2:30 PM",
      status: "Delivered",
      canteen: "Main Canteen"
    },
    {
      id: "1233",
      items: [
        { name: "Masala Dosa", quantity: 2, price: 90 },
        { name: "Samosa", quantity: 4, price: 40 }
      ],
      total: 130,
      date: "2 days ago, 1:15 PM",
      status: "Delivered",
      canteen: "South Canteen"
    }
  ]

  return (
    <div className="min-h-screen bg-black flex">
      <StudentSidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-zinc-900/30 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Food Ordering</h1>
                <p className="text-zinc-400">Order delicious food from the campus canteen</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                  <Input 
                    placeholder="Search food items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="border-zinc-700 text-zinc-400 hover:text-white"
                  onClick={fetchMenuItems}
                  disabled={isLoading}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {isLoading ? "Loading..." : "Refresh"}
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5 text-zinc-400" />
                </Button>
                <UserMenu />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-[#e78a53]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.availableItems}</p>
                    <p className="text-zinc-400 text-sm">Items Available</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                    <Clock className="h-6 w-6 text-[#e78a53]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.avgPrepTime}</p>
                    <p className="text-zinc-400 text-sm">Min Avg Wait</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                    <Star className="h-6 w-6 text-[#e78a53]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.avgRating}</p>
                    <p className="text-zinc-400 text-sm">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-[#e78a53]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.canteenCount}</p>
                    <p className="text-zinc-400 text-sm">Active Canteens</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className={`px-4 py-2 cursor-pointer transition-colors ${
                    category === selectedCategory
                      ? "bg-[#e78a53]/10 border-[#e78a53]/30 text-[#e78a53]"
                      : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Food Items Grid */}
          {isLoading ? (
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-12 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#e78a53] mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-white mb-2">Loading menu items...</h3>
                <p className="text-zinc-400">Please wait while we fetch the latest menu.</p>
              </CardContent>
            </Card>
          ) : filteredItems.length === 0 ? (
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-12 text-center">
                <ShoppingCart className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No menu items found</h3>
                <p className="text-zinc-400 mb-6">
                  {menuItems.length === 0 
                    ? "No canteens have added menu items yet."
                    : "Try adjusting your search or filter criteria."
                  }
                </p>
                <Button 
                  className="bg-[#e78a53] hover:bg-[#e78a53]/90"
                  onClick={fetchMenuItems}
                >
                  Refresh Menu
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item._id} className={`bg-zinc-900/50 border-zinc-800 transition-all hover:bg-zinc-900/70 ${!item.isAvailable ? 'opacity-60' : ''}`}>
                <CardContent className="p-0">
                  {/* Food Image */}
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="h-16 w-16 text-zinc-600" />
                      )}
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.isVeg && (
                        <Badge className="bg-green-500/10 border-green-500/30 text-green-400">
                          <Leaf className="h-3 w-3 mr-1" />
                          Veg
                        </Badge>
                      )}
                      {item.isSpicy && (
                        <Badge className="bg-red-500/10 border-red-500/30 text-red-400">
                          <Flame className="h-3 w-3 mr-1" />
                          Spicy
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-black/50 text-white">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {item.rating}
                      </Badge>
                    </div>
                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge variant="destructive">Currently Unavailable</Badge>
                      </div>
                    )}
                    
                    {/* Canteen Badge */}
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-black/70 text-white border-zinc-600">
                        <Store className="h-3 w-3 mr-1" />
                        {item.canteenName}
                      </Badge>
                    </div>
                  </div>

                  {/* Food Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-[#e78a53] font-bold text-xl">
                          <IndianRupee className="h-5 w-5" />
                          {item.price}
                        </div>
                      </div>
                    </div>

                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <Timer className="h-4 w-4 text-zinc-400" />
                      <span className="text-zinc-400 text-sm">{item.prepTime} min</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-[#e78a53] hover:bg-[#e78a53]/90"
                        disabled={!item.isAvailable}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Order Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 border-zinc-700 text-zinc-400 hover:text-white"
                        disabled={!item.isAvailable}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          )}

          {/* Recent Orders */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-6">Your Recent Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentOrders.map((order) => (
                <Card key={order.id} className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Order #{order.id}</CardTitle>
                    <div className="flex justify-between items-center">
                      <p className="text-zinc-400">{order.date}</p>
                      <Badge className="bg-zinc-700 text-zinc-300">
                        <Store className="h-3 w-3 mr-1" />
                        {order.canteen}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-zinc-300">{item.name} x{item.quantity}</span>
                          <span className="text-zinc-400">₹{item.price}</span>
                        </div>
                      ))}
                      <div className="border-t border-zinc-800 pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span className="text-white">Total</span>
                          <span className="text-[#e78a53]">₹{order.total}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="mt-3 bg-green-500/10 border-green-500/30 text-green-400">
                      {order.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
