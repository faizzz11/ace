"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StudentSidebar } from "@/components/student-sidebar"
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
  Search
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function StudentFoodPage() {
  // Sample food items data
  const foodItems = [
    {
      id: 1,
      name: "Masala Dosa",
      description: "Crispy dosa with spiced potato filling, served with sambar and chutney",
      price: 45,
      category: "South Indian",
      rating: 4.5,
      prepTime: "15-20 min",
      isVeg: true,
      isSpicy: false,
      image: "🥞",
      available: true
    },
    {
      id: 2,
      name: "Chicken Biryani",
      description: "Fragrant basmati rice cooked with marinated chicken and aromatic spices",
      price: 120,
      category: "Main Course",
      rating: 4.8,
      prepTime: "25-30 min",
      isVeg: false,
      isSpicy: true,
      image: "🍚",
      available: true
    },
    {
      id: 3,
      name: "Paneer Butter Masala",
      description: "Rich and creamy tomato-based curry with soft paneer cubes",
      price: 95,
      category: "Main Course",
      rating: 4.3,
      prepTime: "20-25 min",
      isVeg: true,
      isSpicy: false,
      image: "🍛",
      available: true
    },
    {
      id: 4,
      name: "Samosa (2 pieces)",
      description: "Crispy deep-fried pastry filled with spiced potatoes and peas",
      price: 20,
      category: "Snacks",
      rating: 4.2,
      prepTime: "10-15 min",
      isVeg: true,
      isSpicy: true,
      image: "🥟",
      available: true
    },
    {
      id: 5,
      name: "Chole Bhature",
      description: "Spicy chickpea curry served with fluffy deep-fried bread",
      price: 75,
      category: "North Indian",
      rating: 4.6,
      prepTime: "18-22 min",
      isVeg: true,
      isSpicy: true,
      image: "🫓",
      available: true
    },
    {
      id: 6,
      name: "Fresh Lime Soda",
      description: "Refreshing lime soda with mint and black salt",
      price: 25,
      category: "Beverages",
      rating: 4.1,
      prepTime: "5-8 min",
      isVeg: true,
      isSpicy: false,
      image: "🥤",
      available: true
    },
    {
      id: 7,
      name: "Rajma Rice",
      description: "Red kidney bean curry served with steamed basmati rice",
      price: 65,
      category: "Main Course",
      rating: 4.4,
      prepTime: "15-20 min",
      isVeg: true,
      isSpicy: false,
      image: "🍛",
      available: false
    },
    {
      id: 8,
      name: "Vada Pav",
      description: "Mumbai street food - spiced potato fritter in a bun with chutneys",
      price: 30,
      category: "Snacks",
      rating: 4.0,
      prepTime: "10-12 min",
      isVeg: true,
      isSpicy: true,
      image: "🍔",
      available: true
    }
  ]

  const categories = ["All", "Main Course", "Snacks", "South Indian", "North Indian", "Beverages"]

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
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                  <Input 
                    placeholder="Search food items..."
                    className="pl-10 w-64 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
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
                    <p className="text-2xl font-bold text-white">15</p>
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
                    <p className="text-2xl font-bold text-white">12</p>
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
                    <p className="text-2xl font-bold text-white">4.3</p>
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
                    <p className="text-2xl font-bold text-white">3</p>
                    <p className="text-zinc-400 text-sm">Scheduled Orders</p>
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
                    category === "All"
                      ? "bg-[#e78a53]/10 border-[#e78a53]/30 text-[#e78a53]"
                      : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600"
                  }`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Food Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map((item) => (
              <Card key={item.id} className={`bg-zinc-900/50 border-zinc-800 transition-all hover:bg-zinc-900/70 ${!item.available ? 'opacity-60' : ''}`}>
                <CardContent className="p-0">
                  {/* Food Image */}
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-6xl">
                      {item.image}
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
                    {!item.available && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge variant="destructive">Currently Unavailable</Badge>
                      </div>
                    )}
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
                      <span className="text-zinc-400 text-sm">{item.prepTime}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-[#e78a53] hover:bg-[#e78a53]/90"
                        disabled={!item.available}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Order Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 border-zinc-700 text-zinc-400 hover:text-white"
                        disabled={!item.available}
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

          {/* Recent Orders */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-6">Your Recent Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Order #1234</CardTitle>
                  <p className="text-zinc-400">Yesterday, 2:30 PM</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-300">Chicken Biryani x1</span>
                      <span className="text-zinc-400">₹120</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">Fresh Lime Soda x1</span>
                      <span className="text-zinc-400">₹25</span>
                    </div>
                    <div className="border-t border-zinc-800 pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Total</span>
                        <span className="text-[#e78a53]">₹145</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="mt-3 bg-green-500/10 border-green-500/30 text-green-400">
                    Delivered
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Order #1233</CardTitle>
                  <p className="text-zinc-400">2 days ago, 1:15 PM</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-300">Masala Dosa x2</span>
                      <span className="text-zinc-400">₹90</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">Samosa x4</span>
                      <span className="text-zinc-400">₹40</span>
                    </div>
                    <div className="border-t border-zinc-800 pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Total</span>
                        <span className="text-[#e78a53]">₹130</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="mt-3 bg-green-500/10 border-green-500/30 text-green-400">
                    Delivered
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
