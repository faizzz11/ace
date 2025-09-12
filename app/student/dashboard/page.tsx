"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  MapPin,
  UtensilsCrossed,
  BookOpen,
  Users,
  Briefcase,
  UserCheck,
  Bell,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react"

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-[#e78a53] font-bold text-xl">
                ACE Campus
              </Link>
              <span className="text-zinc-400">Student Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-zinc-400" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5 text-zinc-400" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5 text-zinc-400" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-zinc-400">Here's what's happening in your campus today</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <Link href="/student/timetable">
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-[#e78a53]" />
                  </div>
                  Timetable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm mb-3">View your class schedule and upcoming lectures</p>
                <div className="flex items-center text-[#e78a53] text-sm">
                  View Schedule <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/events">
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                    <Users className="h-5 w-5 text-[#e78a53]" />
                  </div>
                  Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm mb-3">Discover campus events and activities</p>
                <div className="flex items-center text-[#e78a53] text-sm">
                  Explore Events <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/food">
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                    <UtensilsCrossed className="h-5 w-5 text-[#e78a53]" />
                  </div>
                  Food Ordering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm mb-3">Order food from campus canteen</p>
                <div className="flex items-center text-[#e78a53] text-sm">
                  Order Now <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/resources">
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-[#e78a53]" />
                  </div>
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm mb-3">Book library & seminar hall resources</p>
                <div className="flex items-center text-[#e78a53] text-sm">
                  Book Resources <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/map">
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-[#e78a53]" />
                  </div>
                  Campus Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm mb-3">Navigate campus with voice assistance</p>
                <div className="flex items-center text-[#e78a53] text-sm">
                  Open Map <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/attendance">
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                    <UserCheck className="h-5 w-5 text-[#e78a53]" />
                  </div>
                  Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm mb-3">Track your attendance records</p>
                <div className="flex items-center text-[#e78a53] text-sm">
                  View Attendance <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/internships">
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                    <Briefcase className="h-5 w-5 text-[#e78a53]" />
                  </div>
                  Internships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm mb-3">Browse internship & job opportunities</p>
                <div className="flex items-center text-[#e78a53] text-sm">
                  Browse Opportunities <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#e78a53] rounded-full mt-2"></div>
                  <div>
                    <p className="text-white text-sm">New assignment posted in Data Structures</p>
                    <p className="text-zinc-400 text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#e78a53] rounded-full mt-2"></div>
                  <div>
                    <p className="text-white text-sm">Tech fest registration opens tomorrow</p>
                    <p className="text-zinc-400 text-xs">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-zinc-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white text-sm">Library book return reminder</p>
                    <p className="text-zinc-400 text-xs">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">Data Structures</p>
                    <p className="text-zinc-400 text-sm">Room 204 • Prof. Smith</p>
                  </div>
                  <span className="text-[#e78a53] text-sm">10:00 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">Web Development</p>
                    <p className="text-zinc-400 text-sm">Lab 3 • Prof. Johnson</p>
                  </div>
                  <span className="text-[#e78a53] text-sm">2:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">Database Systems</p>
                    <p className="text-zinc-400 text-sm">Room 101 • Prof. Williams</p>
                  </div>
                  <span className="text-zinc-400 text-sm">Tomorrow</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
