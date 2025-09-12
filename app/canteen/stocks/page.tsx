"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CanteenSidebar } from "@/components/canteen-sidebar"
import {
  Package,
  AlertTriangle,
  CheckCircle,
  Plus,
  Minus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  PackageCheck,
  PackageX,
  TrendingUp,
  TrendingDown
} from "lucide-react"

export default function CanteenStocksPage() {
  const stockItems = [
    {
      id: 1,
      name: "Basmati Rice",
      category: "Grains",
      currentStock: 2.5,
      unit: "kg",
      minimumStock: 10,
      maxStock: 50,
      costPerUnit: 80,
      supplier: "Rice Mills Co.",
      lastRestocked: "2024-01-10",
      expiryDate: "2024-06-15",
      status: "critical"
    },
    {
      id: 2,
      name: "Chicken (Fresh)",
      category: "Meat",
      currentStock: 5,
      unit: "kg",
      minimumStock: 15,
      maxStock: 30,
      costPerUnit: 220,
      supplier: "Fresh Meat Ltd.",
      lastRestocked: "2024-01-15",
      expiryDate: "2024-01-18",
      status: "low"
    },
    {
      id: 3,
      name: "Paneer",
      category: "Dairy",
      currentStock: 3,
      unit: "kg",
      minimumStock: 8,
      maxStock: 20,
      costPerUnit: 280,
      supplier: "Dairy Fresh",
      lastRestocked: "2024-01-14",
      expiryDate: "2024-01-20",
      status: "low"
    },
    {
      id: 4,
      name: "Onions",
      category: "Vegetables",
      currentStock: 8,
      unit: "kg",
      minimumStock: 20,
      maxStock: 100,
      costPerUnit: 30,
      supplier: "Veggie Mart",
      lastRestocked: "2024-01-12",
      expiryDate: "2024-02-12",
      status: "low"
    },
    {
      id: 5,
      name: "Tomatoes",
      category: "Vegetables",
      currentStock: 25,
      unit: "kg",
      minimumStock: 15,
      maxStock: 50,
      costPerUnit: 40,
      supplier: "Veggie Mart",
      lastRestocked: "2024-01-16",
      expiryDate: "2024-01-25",
      status: "good"
    },
    {
      id: 6,
      name: "Cooking Oil",
      category: "Oils",
      currentStock: 12,
      unit: "liters",
      minimumStock: 10,
      maxStock: 40,
      costPerUnit: 120,
      supplier: "Oil Co.",
      lastRestocked: "2024-01-08",
      expiryDate: "2024-08-08",
      status: "good"
    },
    {
      id: 7,
      name: "Wheat Flour",
      category: "Grains",
      currentStock: 35,
      unit: "kg",
      minimumStock: 25,
      maxStock: 100,
      costPerUnit: 45,
      supplier: "Flour Mills",
      lastRestocked: "2024-01-11",
      expiryDate: "2024-04-11",
      status: "good"
    },
    {
      id: 8,
      name: "Sugar",
      category: "Sweeteners",
      currentStock: 18,
      unit: "kg",
      minimumStock: 15,
      maxStock: 50,
      costPerUnit: 50,
      supplier: "Sweet Supply Co.",
      lastRestocked: "2024-01-13",
      expiryDate: "2024-12-31",
      status: "good"
    }
  ]

  const categories = ["All", "Grains", "Vegetables", "Meat", "Dairy", "Oils", "Spices", "Sweeteners"]

  const getStatusColor = (status: string) => {
    const colors = {
      critical: "bg-red-500/10 border-red-500/30 text-red-400",
      low: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
      good: "bg-[#e78a53]/10 border-[#e78a53]/30 text-[#e78a53]",
      overstock: "bg-blue-500/10 border-blue-500/30 text-blue-400"
    }
    return colors[status as keyof typeof colors] || "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      critical: <AlertTriangle className="h-4 w-4" />,
      low: <TrendingDown className="h-4 w-4" />,
      good: <CheckCircle className="h-4 w-4" />,
      overstock: <TrendingUp className="h-4 w-4" />
    }
    return icons[status as keyof typeof icons] || <Package className="h-4 w-4" />
  }

  const totalItems = stockItems.length
  const criticalItems = stockItems.filter(item => item.status === 'critical').length
  const lowStockItems = stockItems.filter(item => item.status === 'low').length
  const goodStockItems = stockItems.filter(item => item.status === 'good').length
  const totalValue = stockItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0)

  return (
    <div className="min-h-screen bg-black flex">
      <CanteenSidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="bg-zinc-900/30 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Stock Management</h1>
                <p className="text-zinc-400">Monitor and manage your inventory levels</p>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                  <Input 
                    placeholder="Search items..."
                    className="pl-10 w-64 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stock Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Inventory Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                      <Package className="h-6 w-6 text-[#e78a53]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{totalItems}</p>
                      <p className="text-zinc-400 text-sm">Total Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-500/10 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{criticalItems}</p>
                      <p className="text-zinc-400 text-sm">Critical Stock</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-500/10 rounded-lg">
                      <TrendingDown className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{lowStockItems}</p>
                      <p className="text-zinc-400 text-sm">Low Stock</p>
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
                      <p className="text-2xl font-bold text-white">{goodStockItems}</p>
                      <p className="text-zinc-400 text-sm">Good Stock</p>
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
                      <p className="text-2xl font-bold text-white">₹{totalValue.toLocaleString()}</p>
                      <p className="text-zinc-400 text-sm">Total Value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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

          {/* Stock Items Table */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Inventory Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Item</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Category</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Current Stock</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Min/Max</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Cost/Unit</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Status</th>
                      <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockItems.map((item) => (
                      <tr key={item.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-white font-medium">{item.name}</p>
                            <p className="text-zinc-400 text-sm">Supplier: {item.supplier}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                            {item.category}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-white font-semibold">{item.currentStock} {item.unit}</p>
                            <p className="text-zinc-500 text-xs">Last: {item.lastRestocked}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-zinc-300 text-sm">Min: {item.minimumStock} {item.unit}</p>
                            <p className="text-zinc-300 text-sm">Max: {item.maxStock} {item.unit}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-[#e78a53] font-semibold">₹{item.costPerUnit}</p>
                          <p className="text-zinc-500 text-xs">Total: ₹{(item.currentStock * item.costPerUnit).toLocaleString()}</p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(item.status)}>
                            {getStatusIcon(item.status)}
                            <span className="ml-1 capitalize">{item.status}</span>
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="bg-[#e78a53] hover:bg-[#e78a53]/90"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Restock
                            </Button>
                            <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-400">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-red-400">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Restock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stockItems.filter(item => item.status === 'critical' || item.status === 'low').slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-zinc-400 text-sm">{item.currentStock} {item.unit} left</p>
                      </div>
                      <Button size="sm" className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                        Restock
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Expiry Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stockItems.filter(item => new Date(item.expiryDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-red-400 text-sm">Expires: {item.expiryDate}</p>
                      </div>
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Stock Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Items below minimum</span>
                    <span className="text-red-400 font-semibold">{criticalItems + lowStockItems}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Items well stocked</span>
                    <span className="text-[#e78a53] font-semibold">{goodStockItems}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Avg days to restock</span>
                    <span className="text-white font-semibold">3.5 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Monthly stock cost</span>
                    <span className="text-white font-semibold">₹{(totalValue * 0.7).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
