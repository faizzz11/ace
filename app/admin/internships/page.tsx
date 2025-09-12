"use client"

import React, { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Loader2,
  AlertCircle,
  Eye,
  MapPin,
  Clock,
  Building,
  Users,
  X,
  Calendar
} from "lucide-react"
import { redirectIfNotAuthenticatedAdmin } from '@/lib/auth-middleware'

interface Internship {
  _id: string
  title: string
  company: string
  description: string
  requirements: string[]
  responsibilities: string[]
  skills: string[]
  location: string
  locationType: string
  duration: string
  stipend?: string
  applicationDeadline: string
  startDate?: string
  endDate?: string
  contactEmail: string
  contactPhone?: string
  companyWebsite?: string
  applicationUrl?: string
  status: string
  category?: string
  experienceLevel: string
  isRemote: boolean
  applicationCount: number
  createdAt: string
}

export default function AdminInternshipsPage() {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [internships, setInternships] = useState<Internship[]>([])
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false)
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null)
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    requirements: '',
    responsibilities: '',
    skills: '',
    location: '',
    locationType: '',
    duration: '',
    stipend: '',
    applicationDeadline: '',
    startDate: '',
    endDate: '',
    contactEmail: '',
    contactPhone: '',
    companyWebsite: '',
    applicationUrl: '',
    status: 'draft',
    category: '',
    experienceLevel: 'fresher',
    isRemote: false
  })

  useEffect(() => {
    if (!redirectIfNotAuthenticatedAdmin()) {
      return
    }
    
    loadInternships()
    setIsPageLoading(false)
  }, [])

  useEffect(() => {
    filterInternships()
  }, [internships, searchQuery, statusFilter, categoryFilter])

  const loadInternships = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/internships')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load internships')
      }

      setInternships(data.internships || [])
    } catch (error: any) {
      setError(error.message || 'Failed to load internships')
    } finally {
      setIsLoading(false)
    }
  }

  const filterInternships = () => {
    let filtered = internships

    if (searchQuery) {
      filtered = filtered.filter(internship =>
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(internship => internship.status === statusFilter)
    }

    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(internship => internship.category === categoryFilter)
    }

    setFilteredInternships(filtered)
  }

  const openModal = (internship?: Internship) => {
    if (internship) {
      setEditingInternship(internship)
      setFormData({
        title: internship.title,
        company: internship.company,
        description: internship.description,
        requirements: internship.requirements.join(', '),
        responsibilities: internship.responsibilities.join(', '),
        skills: internship.skills.join(', '),
        location: internship.location,
        locationType: internship.locationType,
        duration: internship.duration,
        stipend: internship.stipend || '',
        applicationDeadline: internship.applicationDeadline.split('T')[0],
        startDate: internship.startDate ? internship.startDate.split('T')[0] : '',
        endDate: internship.endDate ? internship.endDate.split('T')[0] : '',
        contactEmail: internship.contactEmail,
        contactPhone: internship.contactPhone || '',
        companyWebsite: internship.companyWebsite || '',
        applicationUrl: internship.applicationUrl || '',
        status: internship.status,
        category: internship.category || '',
        experienceLevel: internship.experienceLevel,
        isRemote: internship.isRemote
      })
    } else {
      setEditingInternship(null)
      setFormData({
        title: '',
        company: '',
        description: '',
        requirements: '',
        responsibilities: '',
        skills: '',
        location: '',
        locationType: '',
        duration: '',
        stipend: '',
        applicationDeadline: '',
        startDate: '',
        endDate: '',
        contactEmail: '',
        contactPhone: '',
        companyWebsite: '',
        applicationUrl: '',
        status: 'draft',
        category: '',
        experienceLevel: 'fresher',
        isRemote: false
      })
    }
    setModalOpen(true)
    setError(null)
  }

  const saveInternship = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const internshipData = {
        ...formData,
        requirements: formData.requirements ? formData.requirements.split(',').map(req => req.trim()).filter(req => req) : [],
        responsibilities: formData.responsibilities ? formData.responsibilities.split(',').map(resp => resp.trim()).filter(resp => resp) : [],
        skills: formData.skills ? formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill) : []
      }

      const url = editingInternship ? `/api/admin/internships?id=${editingInternship._id}` : '/api/admin/internships'
      const method = editingInternship ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(internshipData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save internship')
      }

      await loadInternships()
      setModalOpen(false)
      alert(editingInternship ? 'Internship updated successfully' : 'Internship created successfully')
    } catch (error: any) {
      setError(error.message || 'Failed to save internship')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteInternship = async (internshipId: string) => {
    if (!confirm('Are you sure you want to delete this internship?')) {
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/internships?id=${internshipId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete internship')
      }

      await loadInternships()
      alert('Internship deleted successfully')
    } catch (error: any) {
      setError(error.message || 'Failed to delete internship')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-500/20 border-green-500/30 text-green-400',
      closed: 'bg-red-500/20 border-red-500/30 text-red-400',
      draft: 'bg-gray-500/20 border-gray-500/30 text-gray-400'
    }
    return colors[status as keyof typeof colors] || colors.draft
  }

  const getCategoryBadge = (category?: string) => {
    if (!category) return 'bg-gray-500/20 border-gray-500/30 text-gray-400'
    
    const colors = {
      engineering: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      design: 'bg-pink-500/20 border-pink-500/30 text-pink-400',
      marketing: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
      sales: 'bg-green-500/20 border-green-500/30 text-green-400',
      hr: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
      finance: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
      other: 'bg-gray-500/20 border-gray-500/30 text-gray-400'
    }
    return colors[category as keyof typeof colors] || colors.other
  }

  const getLocationTypeBadge = (locationType: string) => {
    const colors = {
      onsite: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      remote: 'bg-green-500/20 border-green-500/30 text-green-400',
      hybrid: 'bg-purple-500/20 border-purple-500/30 text-purple-400'
    }
    return colors[locationType as keyof typeof colors] || colors.onsite
  }

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#e78a53] mx-auto mb-4" />
          <p className="text-white">Loading internships...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <header className="bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white">Internships Management</h1>
                <p className="text-zinc-400 mt-2">Manage internship opportunities and placements</p>
              </div>
              <Button onClick={() => openModal()} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Internship
              </Button>
            </div>
            
            {error && (
              <Alert className="mt-4 border-red-500/30 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </header>

        <div className="p-8">
          {/* Filters */}
          <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                  <Input
                    placeholder="Search internships..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('')
                    setStatusFilter('all')
                    setCategoryFilter('all')
                  }}
                  className="border-zinc-700 text-zinc-400"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Internships List */}
          <div className="grid gap-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#e78a53]" />
              </div>
            ) : filteredInternships.length === 0 ? (
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-8 text-center">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 text-zinc-400" />
                  <p className="text-zinc-400">No internships found</p>
                </CardContent>
              </Card>
            ) : (
              filteredInternships.map((internship) => (
                <Card key={internship._id} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Building className="h-5 w-5 text-[#e78a53]" />
                          <h3 className="text-xl font-semibold text-white">{internship.title}</h3>
                          <Badge className={getStatusBadge(internship.status)}>
                            {internship.status}
                          </Badge>
                          <Badge className={getLocationTypeBadge(internship.locationType)}>
                            {internship.locationType}
                          </Badge>
                          {internship.category && (
                            <Badge className={getCategoryBadge(internship.category)}>
                              {internship.category}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-lg font-medium text-zinc-300 mb-2">{internship.company}</p>
                        <p className="text-zinc-400 mb-4 line-clamp-2">{internship.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-zinc-300">
                            <MapPin className="h-4 w-4" />
                            {internship.location}
                          </div>
                          <div className="flex items-center gap-2 text-zinc-300">
                            <Clock className="h-4 w-4" />
                            {internship.duration}
                          </div>
                          <div className="flex items-center gap-2 text-zinc-300">
                            <Calendar className="h-4 w-4" />
                            {new Date(internship.applicationDeadline).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-zinc-300">
                            <Users className="h-4 w-4" />
                            {internship.applicationCount} applications
                          </div>
                        </div>
                        
                        {internship.stipend && (
                          <div className="mt-2">
                            <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400">
                              Stipend: {internship.stipend}
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedInternship(internship)
                            setDetailModalOpen(true)
                          }}
                          className="border-zinc-700 text-zinc-400 hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openModal(internship)}
                          className="border-zinc-700 text-zinc-400 hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteInternship(internship._id)}
                          className="border-red-600 text-red-400 hover:bg-red-600/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Create/Edit Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {editingInternship ? (
                  <>
                    <Edit className="h-5 w-5 text-blue-400" />
                    Edit Internship
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 text-[#e78a53]" />
                    Add Internship
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {error && (
                <Alert className="border-red-500/30 bg-red-500/10">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-300">Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Internship title"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Company *</Label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Company name"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-zinc-300">Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700 text-white"
                  placeholder="Internship description"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-zinc-300">Location *</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Location Type *</Label>
                  <Select value={formData.locationType} onValueChange={(value) => setFormData({...formData, locationType: value})}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="onsite">Onsite</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-zinc-300">Duration *</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="e.g., 3 months"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-zinc-300">Application Deadline *</Label>
                  <Input
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) => setFormData({...formData, applicationDeadline: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Start Date</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">End Date</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-300">Contact Email *</Label>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="contact@company.com"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Contact Phone</Label>
                  <Input
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Phone number"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-300">Stipend</Label>
                  <Input
                    value={formData.stipend}
                    onChange={(e) => setFormData({...formData, stipend: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="e.g., ₹10,000/month"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Company Website</Label>
                  <Input
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData({...formData, companyWebsite: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="https://company.com"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-zinc-300">Application URL</Label>
                <Input
                  value={formData.applicationUrl}
                  onChange={(e) => setFormData({...formData, applicationUrl: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700 text-white"
                  placeholder="https://company.com/apply"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-zinc-300">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-zinc-300">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-zinc-300">Experience Level</Label>
                  <Select value={formData.experienceLevel} onValueChange={(value) => setFormData({...formData, experienceLevel: value})}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="fresher">Fresher</SelectItem>
                      <SelectItem value="experienced">Experienced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-zinc-300">Requirements (comma separated)</Label>
                  <Textarea
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Bachelor's degree, Strong communication skills"
                    rows={2}
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Responsibilities (comma separated)</Label>
                  <Textarea
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({...formData, responsibilities: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Assist in development, Write documentation"
                    rows={2}
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Skills (comma separated)</Label>
                  <Textarea
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="JavaScript, React, Node.js"
                    rows={2}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setModalOpen(false)}
                  disabled={isLoading}
                  className="border-zinc-700 text-zinc-400 hover:text-white"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={saveInternship}
                  className="bg-[#e78a53] hover:bg-[#e78a53]/90"
                  disabled={isLoading || !formData.title || !formData.company || !formData.description || !formData.location || !formData.locationType || !formData.duration || !formData.applicationDeadline || !formData.contactEmail}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Briefcase className="h-4 w-4 mr-2" />
                  )}
                  {isLoading 
                    ? (editingInternship ? 'Updating...' : 'Creating...')
                    : (editingInternship ? 'Update' : 'Create') + ' Internship'
                  }
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Detail Modal */}
        <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-[#e78a53]" />
                Internship Details
              </DialogTitle>
            </DialogHeader>
            
            {selectedInternship && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{selectedInternship.title}</h3>
                  <p className="text-lg font-medium text-zinc-300 mb-2">{selectedInternship.company}</p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <Badge className={getStatusBadge(selectedInternship.status)}>
                      {selectedInternship.status}
                    </Badge>
                    <Badge className={getLocationTypeBadge(selectedInternship.locationType)}>
                      {selectedInternship.locationType}
                    </Badge>
                    {selectedInternship.category && (
                      <Badge className={getCategoryBadge(selectedInternship.category)}>
                        {selectedInternship.category}
                      </Badge>
                    )}
                    <Badge className="bg-zinc-700 text-zinc-300">
                      {selectedInternship.experienceLevel}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-400">Location</p>
                    <p className="text-white">{selectedInternship.location}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400">Duration</p>
                    <p className="text-white">{selectedInternship.duration}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400">Application Deadline</p>
                    <p className="text-white">{new Date(selectedInternship.applicationDeadline).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400">Applications</p>
                    <p className="text-white">{selectedInternship.applicationCount}</p>
                  </div>
                  {selectedInternship.stipend && (
                    <div>
                      <p className="text-zinc-400">Stipend</p>
                      <p className="text-white">{selectedInternship.stipend}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-zinc-400">Contact Email</p>
                    <p className="text-white">{selectedInternship.contactEmail}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-zinc-400 mb-2">Description</p>
                  <p className="text-white">{selectedInternship.description}</p>
                </div>
                
                {selectedInternship.requirements && selectedInternship.requirements.length > 0 && (
                  <div>
                    <p className="text-zinc-400 mb-2">Requirements</p>
                    <ul className="list-disc list-inside text-white space-y-1">
                      {selectedInternship.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedInternship.responsibilities && selectedInternship.responsibilities.length > 0 && (
                  <div>
                    <p className="text-zinc-400 mb-2">Responsibilities</p>
                    <ul className="list-disc list-inside text-white space-y-1">
                      {selectedInternship.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedInternship.skills && selectedInternship.skills.length > 0 && (
                  <div>
                    <p className="text-zinc-400 mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedInternship.skills.map((skill, index) => (
                        <Badge key={index} className="bg-zinc-700 text-zinc-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedInternship.companyWebsite && (
                  <div>
                    <p className="text-zinc-400">Company Website</p>
                    <a href={selectedInternship.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-[#e78a53] hover:underline">
                      {selectedInternship.companyWebsite}
                    </a>
                  </div>
                )}
                
                {selectedInternship.applicationUrl && (
                  <div>
                    <p className="text-zinc-400">Application URL</p>
                    <a href={selectedInternship.applicationUrl} target="_blank" rel="noopener noreferrer" className="text-[#e78a53] hover:underline">
                      {selectedInternship.applicationUrl}
                    </a>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
