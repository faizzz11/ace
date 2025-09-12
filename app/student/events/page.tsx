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
  MapPin,
  GraduationCap,
  Gamepad2,
  BookOpen,
  Megaphone
} from "lucide-react"
import { useEffect, useState } from "react"

interface Event {
  _id: string
  title: string
  description: string
  eventType: 'academic' | 'cultural' | 'sports' | 'workshop' | 'seminar' | 'other'
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  venue: string
  organizer: string
  contactEmail?: string
  contactPhone?: string
  maxParticipants?: number
  registrationDeadline?: string
  fee: number
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled'
  imageUrl?: string
  tags: string[]
  requirements: string[]
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export default function StudentEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetchEvents()
    
    // Set up real-time polling to fetch new data every 30 seconds
    const interval = setInterval(() => {
      fetchEvents()
    }, 30000) // 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/student/events?limit=50')
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      const data = await response.json()
      setEvents(data.events || [])
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching events:', error)
      setError('Failed to load events. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (eventType: string) => {
    const colors = {
      academic: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      cultural: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      workshop: "bg-green-500/10 text-green-400 border-green-500/20",
      sports: "bg-red-500/10 text-red-400 border-red-500/20",
      seminar: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      other: "bg-pink-500/10 text-pink-400 border-pink-500/20"
    }
    return colors[eventType as keyof typeof colors] || "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
  }

  const getCategoryIcon = (eventType: string) => {
    const icons = {
      academic: <GraduationCap className="h-5 w-5" />,
      cultural: <Music className="h-5 w-5" />,
      workshop: <Lightbulb className="h-5 w-5" />,
      sports: <Trophy className="h-5 w-5" />,
      seminar: <Megaphone className="h-5 w-5" />,
      other: <BookOpen className="h-5 w-5" />
    }
    return icons[eventType as keyof typeof icons] || <BookOpen className="h-5 w-5" />
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
                {lastUpdated && (
                  <p className="text-zinc-500 text-xs mt-1">Last updated: {lastUpdated.toLocaleTimeString()}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={fetchEvents} variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white" disabled={loading}>
                  <Clock className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Refreshing...' : 'Refresh'}
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5 text-zinc-400" />
                </Button>
              </div>
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
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e78a53] mx-auto"></div>
              <p className="text-zinc-400 mt-4">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">{error}</p>
              <Button onClick={fetchEvents} variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                Try Again
              </Button>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <CalendarDays className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">No events available at the moment</p>
              <p className="text-zinc-500 text-sm mt-2">Check back later for upcoming events</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event._id} className="bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition-colors group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#e78a53]/10 rounded-lg group-hover:bg-[#e78a53]/20 transition-colors">
                          {getCategoryIcon(event.eventType)}
                        </div>
                        <Badge className={`${getCategoryColor(event.eventType)} border`}>
                          {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-white text-lg leading-tight">{event.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">{event.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Calendar className="h-4 w-4 text-[#e78a53]" />
                        <span>{formatDate(event.startDate)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Clock className="h-4 w-4 text-[#e78a53]" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <MapPin className="h-4 w-4 text-[#e78a53]" />
                        <span>{event.venue}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <User className="h-4 w-4 text-[#e78a53]" />
                        <span>{event.organizer}</span>
                      </div>
                    </div>

                    {event.maxParticipants && (
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-zinc-400" />
                          <span className="text-zinc-400 text-sm">
                            Max participants: {event.maxParticipants}
                          </span>
                        </div>
                      </div>
                    )}

                    {event.fee > 0 && (
                      <div className="flex items-center gap-2 text-[#e78a53] text-sm font-semibold">
                        <span>₹{event.fee}</span>
                      </div>
                    )}

                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {event.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-zinc-800/50 text-zinc-400 text-xs">
                            #{tag}
                          </Badge>
                        ))}
                        {event.tags.length > 3 && (
                          <Badge variant="secondary" className="bg-zinc-800/50 text-zinc-400 text-xs">
                            +{event.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    <Button className="w-full bg-[#e78a53] hover:bg-[#e78a53]/90 text-white">
                      {event.fee > 0 ? 'Register & Pay' : 'Register Now'}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

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
