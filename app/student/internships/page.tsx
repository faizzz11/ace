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
  TrendingUp
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function StudentInternshipsPage() {
  const internships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      location: "Mumbai, Maharashtra",
      type: "Remote",
      duration: "3 months",
      stipend: "₹15,000/month",
      postedDate: "2 days ago",
      deadline: "Jan 25, 2024",
      description: "Work on modern web applications using React, TypeScript, and Tailwind CSS. Gain hands-on experience with component libraries and responsive design.",
      requirements: ["React.js", "JavaScript", "HTML/CSS", "Git"],
      companyRating: 4.2,
      applicants: 45,
      status: "Open"
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "Analytics Pro",
      location: "Bangalore, Karnataka",
      type: "On-site",
      duration: "6 months",
      stipend: "₹20,000/month",
      postedDate: "1 week ago",
      deadline: "Jan 30, 2024",
      description: "Join our data science team to work on machine learning models, data analysis, and visualization projects using Python and modern ML frameworks.",
      requirements: ["Python", "Machine Learning", "Pandas", "SQL"],
      companyRating: 4.5,
      applicants: 89,
      status: "Open"
    },
    {
      id: 3,
      title: "Mobile App Developer",
      company: "AppVentures",
      location: "Pune, Maharashtra",
      type: "Hybrid",
      duration: "4 months",
      stipend: "₹18,000/month",
      postedDate: "3 days ago",
      deadline: "Feb 5, 2024",
      description: "Develop cross-platform mobile applications using React Native. Work closely with our design team to implement user-friendly interfaces.",
      requirements: ["React Native", "JavaScript", "Mobile UI/UX", "Firebase"],
      companyRating: 4.0,
      applicants: 67,
      status: "Open"
    },
    {
      id: 4,
      title: "Backend Engineer Intern",
      company: "ServerTech",
      location: "Delhi, NCR",
      type: "On-site",
      duration: "5 months",
      stipend: "₹22,000/month",
      postedDate: "5 days ago",
      deadline: "Jan 28, 2024",
      description: "Build scalable backend services using Node.js, Express, and MongoDB. Learn about microservices architecture and API development.",
      requirements: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
      companyRating: 4.3,
      applicants: 123,
      status: "Open"
    },
    {
      id: 5,
      title: "UI/UX Design Intern",
      company: "DesignHub",
      location: "Chennai, Tamil Nadu",
      type: "Remote",
      duration: "3 months",
      stipend: "₹12,000/month",
      postedDate: "1 day ago",
      deadline: "Feb 10, 2024",
      description: "Create intuitive user interfaces and experiences for web and mobile applications. Work with design systems and conduct user research.",
      requirements: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      companyRating: 4.1,
      applicants: 34,
      status: "Open"
    },
    {
      id: 6,
      title: "DevOps Intern",
      company: "CloudOps Ltd",
      location: "Hyderabad, Telangana",
      type: "Hybrid",
      duration: "6 months",
      stipend: "₹25,000/month",
      postedDate: "1 week ago",
      deadline: "Jan 22, 2024",
      description: "Learn about cloud infrastructure, CI/CD pipelines, and container orchestration. Work with AWS, Docker, and Kubernetes.",
      requirements: ["AWS", "Docker", "Linux", "CI/CD"],
      companyRating: 4.4,
      applicants: 78,
      status: "Closing Soon"
    }
  ]

  const applications = [
    {
      id: 1,
      company: "TechStart Inc",
      position: "Full Stack Intern",
      appliedDate: "Jan 10, 2024",
      status: "Interview Scheduled",
      statusColor: "bg-blue-500/10 border-blue-500/30 text-blue-400"
    },
    {
      id: 2,
      company: "InnovateNow",
      position: "React Developer",
      appliedDate: "Jan 8, 2024",
      status: "Application Reviewed",
      statusColor: "bg-[#e78a53]/10 border-[#e78a53]/30 text-[#e78a53]"
    },
    {
      id: 3,
      company: "DataCorp",
      position: "Data Analyst Intern",
      appliedDate: "Jan 5, 2024",
      status: "Rejected",
      statusColor: "bg-red-500/10 border-red-500/30 text-red-400"
    }
  ]

  const getTypeColor = (type: string) => {
    const colors = {
      Remote: "bg-green-500/10 border-green-500/30 text-green-400",
      "On-site": "bg-blue-500/10 border-blue-500/30 text-blue-400",
      Hybrid: "bg-purple-500/10 border-purple-500/30 text-purple-400"
    }
    return colors[type as keyof typeof colors] || "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"
  }

  const getStatusColor = (status: string) => {
    const colors = {
      Open: "bg-[#e78a53]/10 border-[#e78a53]/30 text-[#e78a53]",
      "Closing Soon": "bg-red-500/10 border-red-500/30 text-red-400"
    }
    return colors[status as keyof typeof colors] || "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"
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
                    <Briefcase className="h-6 w-6 text-[#e78a53]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">156</p>
                    <p className="text-zinc-400 text-sm">Total Opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                    <Send className="h-6 w-6 text-[#e78a53]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-zinc-400 text-sm">Applications Sent</p>
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
                    <p className="text-2xl font-bold text-white">3</p>
                    <p className="text-zinc-400 text-sm">Interview Calls</p>
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
                    <p className="text-2xl font-bold text-white">28</p>
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
              {["All", "Software Development", "Data Science", "Design", "Marketing", "DevOps", "Product"].map((category) => (
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

          {/* Internship Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {internships.map((internship) => (
              <Card key={internship.id} className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70 transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-2">
                      <Badge className={getTypeColor(internship.type)}>
                        {internship.type}
                      </Badge>
                      <Badge className={getStatusColor(internship.status)}>
                        {internship.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-[#e78a53]">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs">{internship.companyRating}</span>
                      </div>
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
                  
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
                    {internship.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Duration</span>
                      <span className="text-zinc-300">{internship.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Stipend</span>
                      <span className="text-[#e78a53] font-semibold">{internship.stipend}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Deadline</span>
                      <span className="text-zinc-300">{internship.deadline}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Applicants</span>
                      <div className="flex items-center gap-1 text-zinc-300">
                        <Users className="h-3 w-3" />
                        {internship.applicants}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-zinc-400 text-sm mb-2 block">Requirements</span>
                    <div className="flex flex-wrap gap-1">
                      {internship.requirements.map((req) => (
                        <Badge key={req} variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#e78a53] hover:bg-[#e78a53]/90">
                      <Send className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* My Applications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">My Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="p-4 bg-zinc-800/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{app.position}</h4>
                        <Badge className={app.statusColor}>
                          {app.status}
                        </Badge>
                      </div>
                      <p className="text-zinc-400 text-sm mb-1">{app.company}</p>
                      <p className="text-zinc-500 text-xs">Applied on {app.appliedDate}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Application Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-[#e78a53]/10 border border-[#e78a53]/30 rounded-lg">
                    <h4 className="text-[#e78a53] font-medium mb-2">Resume Optimization</h4>
                    <p className="text-zinc-300 text-sm">Tailor your resume for each application. Highlight relevant skills and projects.</p>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="text-blue-400 font-medium mb-2">Portfolio Matters</h4>
                    <p className="text-zinc-300 text-sm">Showcase your best work with live demos and detailed case studies.</p>
                  </div>
                  
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <h4 className="text-green-400 font-medium mb-2">Network Actively</h4>
                    <p className="text-zinc-300 text-sm">Connect with employees on LinkedIn and attend virtual company events.</p>
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
