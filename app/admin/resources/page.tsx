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
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Loader2,
  AlertCircle,
  Eye,
  Download,
  Link,
  File,
  Video,
  Image,
  X
} from "lucide-react"
import { redirectIfNotAuthenticatedAdmin } from '@/lib/auth-middleware'

interface Resource {
  _id: string
  title: string
  description: string
  category: string
  subject?: string
  course?: string
  semester?: string
  fileUrl?: string
  fileSize?: number
  fileName?: string
  linkUrl?: string
  author?: string
  uploadedBy: string
  downloadCount: number
  isPublic: boolean
  status: string
  tags: string[]
  difficulty?: string
  createdAt: string
}

export default function AdminResourcesPage() {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resources, setResources] = useState<Resource[]>([])
  const [filteredResources, setFilteredResources] = useState<Resource[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subject: '',
    course: '',
    semester: '',
    fileUrl: '',
    fileName: '',
    linkUrl: '',
    author: '',
    uploadedBy: 'ADMIN1',
    status: 'active',
    tags: '',
    difficulty: '',
    isPublic: true
  })

  useEffect(() => {
    if (!redirectIfNotAuthenticatedAdmin()) {
      return
    }
    
    loadResources()
    setIsPageLoading(false)
  }, [])

  useEffect(() => {
    filterResources()
  }, [resources, searchQuery, statusFilter, categoryFilter])

  const loadResources = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/resources')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load resources')
      }

      setResources(data.resources || [])
    } catch (error: any) {
      setError(error.message || 'Failed to load resources')
    } finally {
      setIsLoading(false)
    }
  }

  const filterResources = () => {
    let filtered = resources

    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (resource.author && resource.author.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(resource => resource.status === statusFilter)
    }

    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(resource => resource.category === categoryFilter)
    }

    setFilteredResources(filtered)
  }

  const openModal = (resource?: Resource) => {
    if (resource) {
      setEditingResource(resource)
      setFormData({
        title: resource.title,
        description: resource.description,
        category: resource.category,
        subject: resource.subject || '',
        course: resource.course || '',
        semester: resource.semester || '',
        fileUrl: resource.fileUrl || '',
        fileName: resource.fileName || '',
        linkUrl: resource.linkUrl || '',
        author: resource.author || '',
        uploadedBy: resource.uploadedBy,
        status: resource.status,
        tags: resource.tags.join(', '),
        difficulty: resource.difficulty || '',
        isPublic: resource.isPublic
      })
    } else {
      setEditingResource(null)
      setFormData({
        title: '',
        description: '',
        category: '',
        subject: '',
        course: '',
        semester: '',
        fileUrl: '',
        fileName: '',
        linkUrl: '',
        author: '',
        uploadedBy: 'ADMIN1',
        status: 'active',
        tags: '',
        difficulty: '',
        isPublic: true
      })
    }
    setModalOpen(true)
    setError(null)
  }

  const saveResource = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const resourceData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
      }

      const url = editingResource ? `/api/admin/resources?id=${editingResource._id}` : '/api/admin/resources'
      const method = editingResource ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resourceData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save resource')
      }

      await loadResources()
      setModalOpen(false)
      alert(editingResource ? 'Resource updated successfully' : 'Resource created successfully')
    } catch (error: any) {
      setError(error.message || 'Failed to save resource')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteResource = async (resourceId: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) {
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/resources?id=${resourceId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete resource')
      }

      await loadResources()
      alert('Resource deleted successfully')
    } catch (error: any) {
      setError(error.message || 'Failed to delete resource')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-500/20 border-green-500/30 text-green-400',
      archived: 'bg-gray-500/20 border-gray-500/30 text-gray-400'
    }
    return colors[status as keyof typeof colors] || colors.active
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      document: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      video: 'bg-red-500/20 border-red-500/30 text-red-400',
      audio: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
      image: 'bg-green-500/20 border-green-500/30 text-green-400',
      link: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
      other: 'bg-gray-500/20 border-gray-500/30 text-gray-400'
    }
    return colors[category as keyof typeof colors] || colors.other
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      document: File,
      video: Video,
      audio: BookOpen,
      image: Image,
      link: Link,
      other: BookOpen
    }
    return icons[category as keyof typeof icons] || BookOpen
  }

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#e78a53] mx-auto mb-4" />
          <p className="text-white">Loading resources...</p>
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
                <h1 className="text-3xl font-bold text-white">Resources Management</h1>
                <p className="text-zinc-400 mt-2">Manage educational resources and materials</p>
              </div>
              <Button onClick={() => openModal()} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
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
                    placeholder="Search resources..."
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
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
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

          {/* Resources List */}
          <div className="grid gap-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#e78a53]" />
              </div>
            ) : filteredResources.length === 0 ? (
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-zinc-400" />
                  <p className="text-zinc-400">No resources found</p>
                </CardContent>
              </Card>
            ) : (
              filteredResources.map((resource) => {
                const CategoryIcon = getCategoryIcon(resource.category)
                return (
                  <Card key={resource._id} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CategoryIcon className="h-5 w-5 text-[#e78a53]" />
                            <h3 className="text-xl font-semibold text-white">{resource.title}</h3>
                            <Badge className={getStatusBadge(resource.status)}>
                              {resource.status}
                            </Badge>
                            <Badge className={getCategoryBadge(resource.category)}>
                              {resource.category}
                            </Badge>
                          </div>
                          
                          <p className="text-zinc-400 mb-4 line-clamp-2">{resource.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            {resource.subject && (
                              <div className="text-zinc-300">
                                <span className="text-zinc-500">Subject: </span>
                                {resource.subject}
                              </div>
                            )}
                            {resource.course && (
                              <div className="text-zinc-300">
                                <span className="text-zinc-500">Course: </span>
                                {resource.course}
                              </div>
                            )}
                            {resource.author && (
                              <div className="text-zinc-300">
                                <span className="text-zinc-500">Author: </span>
                                {resource.author}
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-zinc-300">
                              <Download className="h-4 w-4" />
                              {resource.downloadCount} downloads
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedResource(resource)
                              setDetailModalOpen(true)
                            }}
                            className="border-zinc-700 text-zinc-400 hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openModal(resource)}
                            className="border-zinc-700 text-zinc-400 hover:text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteResource(resource._id)}
                            className="border-red-600 text-red-400 hover:bg-red-600/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>

        {/* Create/Edit Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {editingResource ? (
                  <>
                    <Edit className="h-5 w-5 text-blue-400" />
                    Edit Resource
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 text-[#e78a53]" />
                    Add Resource
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
                    placeholder="Resource title"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label className="text-zinc-300">Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700 text-white"
                  placeholder="Resource description"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-zinc-300">Subject</Label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Subject name"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Course</Label>
                  <Input
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="e.g., B.Tech, M.Sc"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Semester</Label>
                  <Input
                    value={formData.semester}
                    onChange={(e) => setFormData({...formData, semester: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="e.g., 1st Semester"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-300">File URL</Label>
                  <Input
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="https://example.com/file.pdf"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">File Name</Label>
                  <Input
                    value={formData.fileName}
                    onChange={(e) => setFormData({...formData, fileName: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="document.pdf"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-300">Link URL</Label>
                  <Input
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({...formData, linkUrl: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="https://example.com/resource"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Author</Label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Author name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-zinc-300">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-zinc-300">Difficulty</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-zinc-300">Visibility</Label>
                  <Select value={formData.isPublic ? 'public' : 'private'} onValueChange={(value) => setFormData({...formData, isPublic: value === 'public'})}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label className="text-zinc-300">Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700 text-white"
                  placeholder="mathematics, calculus, tutorial"
                />
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
                  onClick={saveResource}
                  className="bg-[#e78a53] hover:bg-[#e78a53]/90"
                  disabled={isLoading || !formData.title || !formData.description || !formData.category}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <BookOpen className="h-4 w-4 mr-2" />
                  )}
                  {isLoading 
                    ? (editingResource ? 'Updating...' : 'Creating...')
                    : (editingResource ? 'Update' : 'Create') + ' Resource'
                  }
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Detail Modal */}
        <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-[#e78a53]" />
                Resource Details
              </DialogTitle>
            </DialogHeader>
            
            {selectedResource && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{selectedResource.title}</h3>
                  <div className="flex gap-2 mb-4">
                    <Badge className={getStatusBadge(selectedResource.status)}>
                      {selectedResource.status}
                    </Badge>
                    <Badge className={getCategoryBadge(selectedResource.category)}>
                      {selectedResource.category}
                    </Badge>
                    {selectedResource.difficulty && (
                      <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-400">
                        {selectedResource.difficulty}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {selectedResource.subject && (
                    <div>
                      <p className="text-zinc-400">Subject</p>
                      <p className="text-white">{selectedResource.subject}</p>
                    </div>
                  )}
                  {selectedResource.course && (
                    <div>
                      <p className="text-zinc-400">Course</p>
                      <p className="text-white">{selectedResource.course}</p>
                    </div>
                  )}
                  {selectedResource.semester && (
                    <div>
                      <p className="text-zinc-400">Semester</p>
                      <p className="text-white">{selectedResource.semester}</p>
                    </div>
                  )}
                  {selectedResource.author && (
                    <div>
                      <p className="text-zinc-400">Author</p>
                      <p className="text-white">{selectedResource.author}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-zinc-400">Downloads</p>
                    <p className="text-white">{selectedResource.downloadCount}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400">Uploaded By</p>
                    <p className="text-white">{selectedResource.uploadedBy}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-zinc-400 mb-2">Description</p>
                  <p className="text-white">{selectedResource.description}</p>
                </div>
                
                {selectedResource.tags && selectedResource.tags.length > 0 && (
                  <div>
                    <p className="text-zinc-400 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedResource.tags.map((tag, index) => (
                        <Badge key={index} className="bg-zinc-700 text-zinc-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedResource.fileUrl && (
                  <div>
                    <p className="text-zinc-400">File URL</p>
                    <a href={selectedResource.fileUrl} target="_blank" rel="noopener noreferrer" className="text-[#e78a53] hover:underline break-all">
                      {selectedResource.fileUrl}
                    </a>
                  </div>
                )}
                
                {selectedResource.linkUrl && (
                  <div>
                    <p className="text-zinc-400">Link URL</p>
                    <a href={selectedResource.linkUrl} target="_blank" rel="noopener noreferrer" className="text-[#e78a53] hover:underline break-all">
                      {selectedResource.linkUrl}
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
