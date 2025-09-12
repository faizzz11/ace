"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StudentSidebar } from "@/components/student-sidebar"
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Building,
  Users,
  Star,
  ExternalLink,
  Search,
  Filter,
  Send,
  BookmarkPlus,
  TrendingUp,
  Mail,
  Phone,
  Globe,
  AlertCircle
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

interface Internship {
  _id: string
  title: string
  company: string
  description: string
  requirements: string[]
  responsibilities: string[]
  skills: string[]
  location: string
  locationType: 'onsite' | 'remote' | 'hybrid'
  duration: string
  stipend?: string
  applicationDeadline: string
  startDate?: string
  endDate?: string
  contactEmail: string
  contactPhone?: string
  companyWebsite?: string
  applicationUrl?: string
  status: 'active' | 'closed' | 'draft'
  category?: 'engineering' | 'design' | 'marketing' | 'sales' | 'hr' | 'finance' | 'other'
  experienceLevel: 'fresher' | 'experienced'
  isRemote: boolean
  applicationCount: number
  createdAt: string
  updatedAt: string
}

export default function StudentInternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocationType, setSelectedLocationType] = useState('All')
  const [stats, setStats] = useState({ totalActive: 0, totalRemote: 0, totalApplications: 0, closingSoon: 0 })

  useEffect(() => {
    fetchInternships()
    
    // Set up real-time polling to fetch new data every 30 seconds
    const interval = setInterval(() => {
      fetchInternships()
    }, 30000) // 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const fetchInternships = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/student/internships?limit=100')
      if (!response.ok) {
        throw new Error('Failed to fetch internships')
      }
      const data = await response.json()
      setInternships(data.internships || [])
      setStats(data.stats || { totalActive: 0, totalRemote: 0, totalApplications: 0, closingSoon: 0 })
    } catch (error) {
      console.error('Error fetching internships:', error)
      setError('Failed to load internships. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || internship.category === selectedCategory.toLowerCase()
    const matchesLocationType = selectedLocationType === 'All' || internship.locationType === selectedLocationType.toLowerCase()
    return matchesSearch && matchesCategory && matchesLocationType
  })


  const getLocationTypeColor = (locationType: string) => {
    const colors = {
      remote: "bg-green-500/10 border-green-500/30 text-green-400",
      onsite: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      hybrid: "bg-purple-500/10 border-purple-500/30 text-purple-400"
    }
    return colors[locationType as keyof typeof colors] || "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      engineering: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      design: "bg-pink-500/10 border-pink-500/30 text-pink-400",
      marketing: "bg-orange-500/10 border-orange-500/30 text-orange-400",
      sales: "bg-green-500/10 border-green-500/30 text-green-400",
      hr: "bg-purple-500/10 border-purple-500/30 text-purple-400",
      finance: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
      other: "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"
    }
    return colors[category as keyof typeof colors] || "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const now = new Date()
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays >= 0
  }

  return (
    <div className="min-h-screen bg-black flex">
      <StudentSidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="bg-zinc-900/30 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Internship Portal</h1>
                <p className="text-zinc-400">Discover and apply for amazing internship opportunities</p>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                  <Input 
                    placeholder="Search internships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
                <Button onClick={fetchInternships} variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white" disabled={loading}>
                  <Clock className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Refreshing...' : 'Refresh'}
                </Button>
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
                    <Briefcase className="h-6 w-6 text-[#e78a53]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{loading ? '--' : stats.totalActive}</p>
                    <p className="text-zinc-400 text-sm">Total Opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-[#e78a53]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{loading ? '--' : stats.totalRemote}</p>
                    <p className="text-zinc-400 text-sm">Remote Opportunities</p>
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
                    <p className="text-2xl font-bold text-white">{loading ? '--' : stats.totalApplications}</p>
                    <p className="text-zinc-400 text-sm">Total Applications</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-[#e78a53]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{loading ? '--' : stats.closingSoon}</p>
                    <p className="text-zinc-400 text-sm">Closing Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
              <div className="flex flex-wrap gap-3">
                {["All", "Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Other"].map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 cursor-pointer transition-colors ${
                      category === selectedCategory
                        ? "bg-[#e78a53]/10 border-[#e78a53]/30 text-[#e78a53]"
                        : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600"
                    }`}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Work Type</h3>
              <div className="flex flex-wrap gap-3">
                {["All", "Remote", "Onsite", "Hybrid"].map((type) => (
                  <Badge
                    key={type}
                    variant="outline"
                    onClick={() => setSelectedLocationType(type)}
                    className={`px-4 py-2 cursor-pointer transition-colors ${
                      type === selectedLocationType
                        ? "bg-[#e78a53]/10 border-[#e78a53]/30 text-[#e78a53]"
                        : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600"
                    }`}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Internship Listings */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e78a53] mx-auto"></div>
              <p className="text-zinc-400 mt-4">Loading internships...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">{error}</p>
              <Button onClick={fetchInternships} variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                Try Again
              </Button>
            </div>
          ) : filteredInternships.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">No internships found</p>
              <p className="text-zinc-500 text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {filteredInternships.map((internship) => (
                <Card key={internship._id} className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70 transition-all">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-2">
                        <Badge className={getLocationTypeColor(internship.locationType)}>
                          {internship.locationType.charAt(0).toUpperCase() + internship.locationType.slice(1)}
                        </Badge>
                        {internship.category && (
                          <Badge className={getCategoryColor(internship.category)}>
                            {internship.category.charAt(0).toUpperCase() + internship.category.slice(1)}
                          </Badge>
                        )}
                        {isDeadlineNear(internship.applicationDeadline) && (
                          <Badge className="bg-red-500/10 border-red-500/30 text-red-400">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Closing Soon
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <CardTitle className="text-white text-lg mb-2">{internship.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {internship.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {internship.location}
                      </div>
                    </div>
                    
                    <p className="text-zinc-400 text-sm line-clamp-3 mb-3">
                      {internship.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Duration</span>
                        <span className="text-zinc-300">{internship.duration}</span>
                      </div>
                      {internship.stipend && (
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Stipend</span>
                          <span className="text-[#e78a53] font-semibold">{internship.stipend}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Deadline</span>
                        <span className={`text-sm ${isDeadlineNear(internship.applicationDeadline) ? 'text-red-400 font-semibold' : 'text-zinc-300'}`}>
                          {formatDate(internship.applicationDeadline)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Applicants</span>
                        <div className="flex items-center gap-1 text-zinc-300">
                          <Users className="h-3 w-3" />
                          {internship.applicationCount}
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Experience</span>
                        <span className="text-zinc-300 capitalize">{internship.experienceLevel}</span>
                      </div>
                    </div>

                    {internship.requirements && internship.requirements.length > 0 && (
                      <div className="mb-4">
                        <span className="text-zinc-400 text-sm mb-2 block">Requirements</span>
                        <div className="flex flex-wrap gap-1">
                          {internship.requirements.slice(0, 4).map((req) => (
                            <Badge key={req} variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                              {req}
                            </Badge>
                          ))}
                          {internship.requirements.length > 4 && (
                            <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                              +{internship.requirements.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {internship.skills && internship.skills.length > 0 && (
                      <div className="mb-4">
                        <span className="text-zinc-400 text-sm mb-2 block">Skills</span>
                        <div className="flex flex-wrap gap-1">
                          {internship.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="bg-zinc-800/50 text-zinc-400 text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {internship.skills.length > 3 && (
                            <Badge variant="secondary" className="bg-zinc-800/50 text-zinc-400 text-xs">
                              +{internship.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-4 text-xs text-zinc-400">
                      {internship.contactEmail && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{internship.contactEmail}</span>
                        </div>
                      )}
                      {internship.companyWebsite && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          <span>Website</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-[#e78a53] hover:bg-[#e78a53]/90"
                        disabled={new Date(internship.applicationDeadline) < new Date()}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {new Date(internship.applicationDeadline) < new Date() ? 'Expired' : 'Apply Now'}
                      </Button>
                      <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                      {internship.applicationUrl || internship.companyWebsite ? (
                        <Button 
                          variant="outline" 
                          className="border-zinc-700 text-zinc-400 hover:text-white"
                          onClick={() => window.open(internship.applicationUrl || internship.companyWebsite, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Application Tips */}
          <Card className="bg-zinc-900/50 border-zinc-800 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white text-center">Application Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-[#e78a53]/10 border border-[#e78a53]/30 rounded-lg">
                  <h4 className="text-[#e78a53] font-medium mb-2">Resume Optimization</h4>
                  <p className="text-zinc-300 text-sm">Tailor your resume for each application. Highlight relevant skills and projects that match the requirements.</p>
                </div>
                
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h4 className="text-blue-400 font-medium mb-2">Portfolio Matters</h4>
                  <p className="text-zinc-300 text-sm">Showcase your best work with live demos, detailed case studies, and quantifiable results.</p>
                </div>
                
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <h4 className="text-green-400 font-medium mb-2">Apply Early</h4>
                  <p className="text-zinc-300 text-sm">Don't wait until the deadline. Early applications often get more attention from recruiters.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
