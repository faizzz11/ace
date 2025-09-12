"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StudentSidebar } from "@/components/student-sidebar"
import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Video,
  Code,
  Search,
  Filter,
  Clock,
  Star,
  Eye
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function StudentResourcesPage() {
  const resources = [
    {
      id: 1,
      title: "Data Structures and Algorithms",
      description: "Complete guide to DSA with examples and practice problems",
      type: "PDF",
      subject: "Computer Science",
      downloads: 245,
      rating: 4.8,
      size: "15.2 MB",
      uploadedBy: "Prof. Smith",
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Web Development Tutorial Series",
      description: "Step-by-step video tutorials covering HTML, CSS, JavaScript, and React",
      type: "Video",
      subject: "Web Development",
      downloads: 189,
      rating: 4.6,
      size: "2.1 GB",
      uploadedBy: "Prof. Davis",
      date: "1 week ago"
    },
    {
      id: 3,
      title: "Database Management Systems Notes",
      description: "Comprehensive notes covering SQL, normalization, and database design",
      type: "PDF",
      subject: "Database",
      downloads: 156,
      rating: 4.5,
      size: "8.7 MB",
      uploadedBy: "Prof. Wilson",
      date: "3 days ago"
    },
    {
      id: 4,
      title: "Python Programming Examples",
      description: "Collection of Python code examples and mini-projects",
      type: "Code",
      subject: "Programming",
      downloads: 203,
      rating: 4.7,
      size: "3.4 MB",
      uploadedBy: "Prof. Johnson",
      date: "5 days ago"
    },
    {
      id: 5,
      title: "Operating Systems Lab Manual",
      description: "Lab exercises and assignments for OS concepts",
      type: "PDF",
      subject: "Operating Systems",
      downloads: 134,
      rating: 4.3,
      size: "12.5 MB",
      uploadedBy: "Prof. Anderson",
      date: "1 week ago"
    },
    {
      id: 6,
      title: "Machine Learning Lecture Videos",
      description: "Complete ML course with practical implementations",
      type: "Video",
      subject: "Machine Learning",
      downloads: 78,
      rating: 4.9,
      size: "4.2 GB",
      uploadedBy: "Dr. Kumar",
      date: "2 weeks ago"
    }
  ]

  const getTypeIcon = (type: string) => {
    const icons = {
      PDF: <FileText className="h-4 w-4" />,
      Video: <Video className="h-4 w-4" />,
      Code: <Code className="h-4 w-4" />
    }
    return icons[type as keyof typeof icons] || <FileText className="h-4 w-4" />
  }

  const getTypeColor = (type: string) => {
    const colors = {
      PDF: "bg-red-500/10 border-red-500/30 text-red-400",
      Video: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      Code: "bg-green-500/10 border-green-500/30 text-green-400"
    }
    return colors[type as keyof typeof colors] || "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"
  }

  return (
    <div className="min-h-screen bg-black flex">
      <StudentSidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="bg-zinc-900/30 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Learning Resources</h1>
                <p className="text-zinc-400">Access study materials, notes, and course content</p>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                  <Input 
                    placeholder="Search resources..."
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
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">156</p>
                    <p className="text-zinc-400 text-sm">Total Resources</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <Download className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">1.2K</p>
                    <p className="text-zinc-400 text-sm">Downloads</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">4.6</p>
                    <p className="text-zinc-400 text-sm">Avg Rating</p>
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
                    <p className="text-zinc-400 text-sm">New This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {["All", "Computer Science", "Mathematics", "Web Development", "Database", "Programming", "Machine Learning"].map((category) => (
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

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70 transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <Badge className={getTypeColor(resource.type)}>
                      {getTypeIcon(resource.type)}
                      <span className="ml-1">{resource.type}</span>
                    </Badge>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs text-zinc-400">{resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg line-clamp-2">{resource.title}</CardTitle>
                  <p className="text-zinc-400 text-sm line-clamp-2">{resource.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Subject</span>
                      <span className="text-zinc-300">{resource.subject}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Size</span>
                      <span className="text-zinc-300">{resource.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Downloads</span>
                      <div className="flex items-center gap-1 text-zinc-300">
                        <Download className="h-3 w-3" />
                        {resource.downloads}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Uploaded by</span>
                      <span className="text-zinc-300">{resource.uploadedBy}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Date</span>
                      <span className="text-zinc-300">{resource.date}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#e78a53] hover:bg-[#e78a53]/90">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recently Downloaded */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-6">Recently Downloaded</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-500/10 rounded-lg">
                      <FileText className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">Data Structures and Algorithms</h3>
                      <p className="text-zinc-400 text-sm">Downloaded yesterday</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-zinc-500 text-xs">15.2 MB</span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <Code className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">Python Programming Examples</h3>
                      <p className="text-zinc-400 text-sm">Downloaded 3 days ago</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-zinc-500 text-xs">3.4 MB</span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs">4.7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
