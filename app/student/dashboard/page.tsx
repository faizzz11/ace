"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StudentSidebar } from "@/components/student-sidebar"
import {
  Bell,
  ChevronRight,
  Clock,
  User,
  Trophy,
  Lightbulb,
  Music,
  Palette,
  Code,
  Heart,
  Star,
  Eye,
  CalendarDays,
  Building,
  Briefcase,
  Users,
  Calendar,
  MapPin
} from "lucide-react"

export default function StudentDashboard() {
  // Dummy events data
  const events = [
    {
      id: 1,
      title: "Tech Fest 2024",
      description: "Annual technology festival featuring coding competitions, workshops, and tech talks by industry experts.",
      date: "2024-03-15",
      time: "09:00 AM",
      location: "Main Auditorium",
      category: "Technology",
      organizer: "Computer Science Department",
      image: "/placeholder-tech.jpg",
      attendees: 250,
      maxAttendees: 300,
      status: "upcoming",
      tags: ["coding", "workshops", "tech-talks"],
      icon: <Code className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Cultural Night",
      description: "Celebrate diversity with music, dance, and cultural performances from students across different backgrounds.",
      date: "2024-03-20",
      time: "06:00 PM",
      location: "Open Ground",
      category: "Cultural",
      organizer: "Cultural Committee",
      image: "/placeholder-cultural.jpg",
      attendees: 180,
      maxAttendees: 400,
      status: "upcoming",
      tags: ["music", "dance", "cultural"],
      icon: <Music className="h-5 w-5" />
    },
    {
      id: 3,
      title: "AI & Machine Learning Workshop",
      description: "Hands-on workshop on artificial intelligence and machine learning fundamentals with practical projects.",
      date: "2024-03-25",
      time: "10:00 AM",
      location: "Computer Lab 1",
      category: "Workshop",
      organizer: "AI Club",
      image: "/placeholder-ai.jpg",
      attendees: 45,
      maxAttendees: 50,
      status: "upcoming",
      tags: ["AI", "ML", "workshop"],
      icon: <Lightbulb className="h-5 w-5" />
    },
    {
      id: 4,
      title: "Inter-College Sports Meet",
      description: "Annual sports competition featuring various games including cricket, football, basketball, and athletics.",
      date: "2024-03-30",
      time: "08:00 AM",
      location: "Sports Complex",
      category: "Sports",
      organizer: "Sports Committee",
      image: "/placeholder-sports.jpg",
      attendees: 320,
      maxAttendees: 500,
      status: "upcoming",
      tags: ["sports", "competition", "athletics"],
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 5,
      title: "Art Exhibition",
      description: "Showcase of creative artworks, paintings, sculptures, and digital art by talented students.",
      date: "2024-04-05",
      time: "11:00 AM",
      location: "Art Gallery",
      category: "Arts",
      organizer: "Fine Arts Department",
      image: "/placeholder-art.jpg",
      attendees: 85,
      maxAttendees: 150,
      status: "upcoming",
      tags: ["art", "exhibition", "creativity"],
      icon: <Palette className="h-5 w-5" />
    },
    {
      id: 6,
      title: "Career Fair 2024",
      description: "Meet with top companies and recruiters. Great opportunity for networking and job placements.",
      date: "2024-04-10",
      time: "09:00 AM",
      location: "Main Hall",
      category: "Career",
      organizer: "Placement Cell",
      image: "/placeholder-career.jpg",
      attendees: 200,
      maxAttendees: 350,
      status: "upcoming",
      tags: ["career", "jobs", "networking"],
      icon: <Briefcase className="h-5 w-5" />
    }
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      Technology: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      Cultural: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      Workshop: "bg-green-500/10 text-green-400 border-green-500/20",
      Sports: "bg-red-500/10 text-red-400 border-red-500/20",
      Arts: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      Career: "bg-orange-500/10 text-orange-400 border-orange-500/20"
    }
    return colors[category as keyof typeof colors] || "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-black flex">
      <StudentSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-zinc-900/30 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Campus Events</h1>
                <p className="text-zinc-400">Discover and join exciting events happening on campus</p>
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-zinc-400" />
              </Button>
            </div>
          </div>
        </header>

        {/* Events Content */}
        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <CalendarDays className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{events.length}</p>
                    <p className="text-zinc-400 text-sm">Upcoming Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <Users className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">1.2K</p>
                    <p className="text-zinc-400 text-sm">Total Participants</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <Building className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">8</p>
                    <p className="text-zinc-400 text-sm">Event Categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition-colors group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#e78a53]/10 rounded-lg group-hover:bg-[#e78a53]/20 transition-colors">
                        {event.icon}
                      </div>
                      <Badge className={`${getCategoryColor(event.category)} border`}>
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg leading-tight">{event.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-zinc-400 text-sm leading-relaxed">{event.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Calendar className="h-4 w-4 text-[#e78a53]" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Clock className="h-4 w-4 text-[#e78a53]" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <MapPin className="h-4 w-4 text-[#e78a53]" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <User className="h-4 w-4 text-[#e78a53]" />
                      <span>{event.organizer}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-zinc-400" />
                      <span className="text-zinc-400 text-sm">
                        {event.attendees}/{event.maxAttendees} registered
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-zinc-800/50 text-zinc-400 text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full bg-[#e78a53] hover:bg-[#e78a53]/90 text-white">
                    Register Now
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white hover:border-[#e78a53]/50">
              Load More Events
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
