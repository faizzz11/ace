"use client"

import React, { useState, useEffect } from "react"
import { TeacherSidebar } from "@/components/teacher-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Search,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  History,
  BarChart3,
  Eye,
  Filter,
  X,
  BookOpen,
  Edit,
  Trash2,
  Plus,
  Save
} from "lucide-react"
import { 
  getCurrentTeacherId, 
  getCurrentTeacherInfo, 
  redirectIfNotAuthenticated 
} from "@/lib/auth-middleware"

interface Student {
  _id: string
  name: string
  rollNumber: string
  studentId: string
  section: string
  email: string
}

interface AttendanceRecord {
  _id: string
  studentId: Student
  status: 'present' | 'absent' | 'late'
  date: string
  className: string
  subjectName: string
  remarks?: string
}

interface StudentStats {
  student: Student
  totalClasses: number
  presentCount: number
  absentCount: number
  lateCount: number
  attendancePercentage: number
}

export default function TeacherAttendancePage() {
  const [currentTeacher, setCurrentTeacher] = useState<any>(null)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Current attendance marking
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10))
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [students, setStudents] = useState<Student[]>([])
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({})
  const [remarks, setRemarks] = useState<Record<string, string>>({})
  
  // Available options
  const [availableClasses, setAvailableClasses] = useState<string[]>([])
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([])
  
  // Search and filtering
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'mark' | 'history' | 'analytics' | 'manage-students' | 'manage-classes'>('mark')
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([])
  const [studentStats, setStudentStats] = useState<StudentStats[]>([])
  const [selectedStudentHistory, setSelectedStudentHistory] = useState<any>(null)
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  
  // Date range for history
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  // Student management
  const [studentModalOpen, setStudentModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<any>(null)
  const [studentFormData, setStudentFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rollNumber: '',
    studentId: '',
    section: '',
    course: '',
    branch: ''
  })
  
  // Class management
  const [classModalOpen, setClassModalOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<any>(null)
  const [classFormData, setClassFormData] = useState({
    className: '',
    subjectName: '',
    day: '',
    timeSlot: ''
  })
  
  // All students for management
  const [allStudents, setAllStudents] = useState<any[]>([])
  const [timetableEntries, setTimetableEntries] = useState<any[]>([])

  // Authentication and initialization
  useEffect(() => {
    if (!redirectIfNotAuthenticated()) {
      return
    }
    
    const teacherInfo = getCurrentTeacherInfo()
    if (!teacherInfo) {
      window.location.href = '/login'
      return
    }
    
    setCurrentTeacher(teacherInfo)
    initializeData()
  }, [])

  // Initialize data
  const initializeData = async () => {
    try {
      setIsPageLoading(true)
      await loadTeacherClasses()
    } catch (err: any) {
      setError(err.message || 'Failed to load data')
    } finally {
      setIsPageLoading(false)
    }
  }

  // Load teacher's classes and subjects from timetable
  const loadTeacherClasses = async () => {
    try {
      const teacherId = getCurrentTeacherId()
      if (!teacherId) throw new Error('No teacher ID found')
      
      const response = await fetch(`/api/timetable?teacherId=${teacherId}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load classes')
      }
      
      const classes = [...new Set(data.lectures?.map((l: any) => l.className) || [])]
      const subjects = [...new Set(data.lectures?.map((l: any) => l.subjectName) || [])]
      
      setAvailableClasses(classes)
      setAvailableSubjects(subjects)
      
      // Auto-select first class if available
      if (classes.length > 0 && !selectedClass) {
        setSelectedClass(classes[0])
      }
      if (subjects.length > 0 && !selectedSubject) {
        setSelectedSubject(subjects[0])
      }
    } catch (error: any) {
      console.error('Error loading classes:', error)
      setError(error.message || 'Failed to load classes')
    }
  }

  // Load students when class changes
  useEffect(() => {
    if (selectedClass) {
      loadStudents()
    }
  }, [selectedClass])

  // Load students for selected class
  const loadStudents = async () => {
    try {
      const teacherId = getCurrentTeacherId()
      if (!teacherId) return
      
      setIsLoading(true)
      const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
      const response = await fetch(`/api/students?teacherId=${teacherId}&className=${selectedClass}${searchParam}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load students')
      }
      
      setStudents(data.students || [])
      
      // Load existing attendance for selected date
      if (data.students?.length > 0) {
        await loadExistingAttendance()
      }
    } catch (error: any) {
      console.error('Error loading students:', error)
      setError(error.message || 'Failed to load students')
    } finally {
      setIsLoading(false)
    }
  }

  // Load existing attendance for the selected date
  const loadExistingAttendance = async () => {
    try {
      const teacherId = getCurrentTeacherId()
      if (!teacherId || !selectedClass || !selectedSubject) return
      
      const response = await fetch(
        `/api/attendance?teacherId=${teacherId}&date=${selectedDate}&className=${selectedClass}`
      )
      const data = await response.json()
      
      if (response.ok && data.attendance) {
        const existingAttendance: Record<string, 'present' | 'absent' | 'late'> = {}
        const existingRemarks: Record<string, string> = {}
        
        data.attendance.forEach((record: AttendanceRecord) => {
          if (record.subjectName === selectedSubject) {
            existingAttendance[record.studentId._id] = record.status
            if (record.remarks) {
              existingRemarks[record.studentId._id] = record.remarks
            }
          }
        })
        
        setAttendance(existingAttendance)
        setRemarks(existingRemarks)
      }
    } catch (error: any) {
      console.error('Error loading existing attendance:', error)
    }
  }

  // Reload data when date, class, or subject changes
  useEffect(() => {
    if (selectedClass && selectedSubject) {
      loadExistingAttendance()
    }
  }, [selectedDate, selectedClass, selectedSubject])

  // Search functionality
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (selectedClass) {
        loadStudents()
      }
    }, 300)
    
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  // Mark attendance functions
  const toggleAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }))
  }

  const markAllPresent = () => {
    const newAttendance: Record<string, 'present' | 'absent' | 'late'> = {}
    students.forEach(student => {
      newAttendance[student._id] = 'present'
    })
    setAttendance(newAttendance)
  }

  const markAllAbsent = () => {
    const newAttendance: Record<string, 'present' | 'absent' | 'late'> = {}
    students.forEach(student => {
      newAttendance[student._id] = 'absent'
    })
    setAttendance(newAttendance)
  }

  // Save attendance
  const saveAttendance = async () => {
    try {
      const teacherId = getCurrentTeacherId()
      if (!teacherId || !selectedClass || !selectedSubject) {
        setError('Please select class and subject')
        return
      }
      
      setIsLoading(true)
      setError(null)
      
      const attendanceData = students.map(student => ({
        studentId: student._id,
        status: attendance[student._id] || 'absent',
        remarks: remarks[student._id] || undefined
      }))
      
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId,
          date: selectedDate,
          className: selectedClass,
          subjectName: selectedSubject,
          attendanceData
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save attendance')
      }
      
      alert(`Attendance saved successfully for ${selectedClass} - ${selectedSubject} on ${selectedDate}`)
    } catch (error: any) {
      console.error('Error saving attendance:', error)
      setError(error.message || 'Failed to save attendance')
    } finally {
      setIsLoading(false)
    }
  }

  // Load attendance history
  const loadAttendanceHistory = async () => {
    try {
      const teacherId = getCurrentTeacherId()
      if (!teacherId) return
      
      setIsLoading(true)
      let url = `/api/attendance/history?teacherId=${teacherId}`
      if (selectedClass) url += `&className=${selectedClass}`
      if (selectedSubject) url += `&subjectName=${selectedSubject}`
      if (startDate) url += `&startDate=${startDate}`
      if (endDate) url += `&endDate=${endDate}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load history')
      }
      
      if (data.classOverview) {
        setStudentStats(data.classOverview.students || [])
        setAttendanceHistory(data.classOverview.dateWiseSummary || [])
      }
    } catch (error: any) {
      console.error('Error loading history:', error)
      setError(error.message || 'Failed to load attendance history')
    } finally {
      setIsLoading(false)
    }
  }

  // Load specific student history
  const loadStudentHistory = async (studentId: string) => {
    try {
      const teacherId = getCurrentTeacherId()
      if (!teacherId) return
      
      setIsLoading(true)
      let url = `/api/attendance/history?teacherId=${teacherId}&studentId=${studentId}`
      if (selectedClass) url += `&className=${selectedClass}`
      if (selectedSubject) url += `&subjectName=${selectedSubject}`
      if (startDate) url += `&startDate=${startDate}`
      if (endDate) url += `&endDate=${endDate}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load student history')
      }
      
      setSelectedStudentHistory(data.studentHistory)
      setHistoryModalOpen(true)
    } catch (error: any) {
      console.error('Error loading student history:', error)
      setError(error.message || 'Failed to load student history')
    } finally {
      setIsLoading(false)
    }
  }

  // Student Management Functions
  const loadAllStudents = async () => {
    try {
      const teacherId = getCurrentTeacherId()
      if (!teacherId) return
      
      setIsLoading(true)
      const response = await fetch(`/api/teacher/students?teacherId=${teacherId}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load students')
      }
      
      // Flatten grouped students or use direct array
      const studentsArray = Array.isArray(data.students) 
        ? data.students 
        : Object.values(data.students).flat()
      
      setAllStudents(studentsArray)
    } catch (error: any) {
      console.error('Error loading all students:', error)
      setError(error.message || 'Failed to load students')
    } finally {
      setIsLoading(false)
    }
  }

  const openStudentModal = (student?: any) => {
    if (student) {
      setEditingStudent(student)
      setStudentFormData({
        firstName: student.name || `${student.firstName || ''} ${student.lastName || ''}`.trim(),
        lastName: '',
        email: student.email || '',
        password: '',
        rollNumber: student.rollNumber || '',
        studentId: student.studentId || '',
        section: student.section || '',
        course: student.course || '',
        branch: student.branch || ''
      })
    } else {
      setEditingStudent(null)
      setStudentFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rollNumber: '',
        studentId: '',
        section: '',
        course: '',
        branch: ''
      })
    }
    setStudentModalOpen(true)
    setError(null)
  }

  const saveStudent = async () => {
    try {
      const teacherId = getCurrentTeacherId()
      if (!teacherId) return
      
      if (!editingStudent && !studentFormData.password) {
        setError('Password is required for new students')
        return
      }
      
      // Basic validation for required fields
      const requiredFields = ['firstName', 'rollNumber', 'studentId', 'section', 'course', 'branch']
      const missingFields = requiredFields.filter(field => !studentFormData[field as keyof typeof studentFormData])
      
      if (missingFields.length > 0) {
        setError(`Please fill in required fields: ${missingFields.join(', ')}`)
        return
      }
      
      setIsLoading(true)
      setError(null)
      
      const method = editingStudent ? 'PUT' : 'POST'
      const payload = editingStudent 
        ? { 
            teacherId, 
            studentId: editingStudent._id, 
            name: studentFormData.firstName,
            firstName: studentFormData.firstName,
            lastName: studentFormData.lastName,
            email: studentFormData.email,
            rollNumber: studentFormData.rollNumber,
            studentId: studentFormData.studentId,
            section: studentFormData.section,
            course: studentFormData.course,
            branch: studentFormData.branch
          }
        : { 
            teacherId, 
            name: studentFormData.firstName,
            firstName: studentFormData.firstName,
            lastName: studentFormData.lastName,
            email: studentFormData.email,
            password: studentFormData.password,
            rollNumber: studentFormData.rollNumber,
            studentId: studentFormData.studentId,
            section: studentFormData.section,
            course: studentFormData.course,
            branch: studentFormData.branch
          }
      
      const response = await fetch('/api/teacher/students', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save student')
      }
      
      await loadAllStudents()
      setStudentModalOpen(false)
      alert(editingStudent ? 'Student updated successfully' : 'Student added successfully')
    } catch (error: any) {
      console.error('Error saving student:', error)
      setError(error.message || 'Failed to save student')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to delete this student?')) {
      return
    }
    
    try {
      const teacherId = getCurrentTeacherId()
      if (!teacherId) return
      
      setIsLoading(true)
      const response = await fetch(`/api/teacher/students?teacherId=${teacherId}&studentId=${studentId}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete student')
      }
      
      await loadAllStudents()
      alert('Student deleted successfully')
    } catch (error: any) {
      console.error('Error deleting student:', error)
      setError(error.message || 'Failed to delete student')
    } finally {
      setIsLoading(false)
    }
  }

  // Class Management Functions
  const loadTimetableEntries = async () => {
    try {
      const teacherId = getCurrentTeacherId()
      if (!teacherId) return
      
      setIsLoading(true)
      const response = await fetch(`/api/teacher/classes?teacherId=${teacherId}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load classes')
      }
      
      setTimetableEntries(data.timetableEntries || [])
    } catch (error: any) {
      console.error('Error loading timetable entries:', error)
      setError(error.message || 'Failed to load classes')
    } finally {
      setIsLoading(false)
    }
  }

  const openClassModal = (entry?: any) => {
    if (entry) {
      setEditingClass(entry)
      setClassFormData({
        className: entry.className || '',
        subjectName: entry.subjectName || '',
        day: entry.day || '',
        timeSlot: entry.timeSlot || ''
      })
    } else {
      setEditingClass(null)
      setClassFormData({
        className: '',
        subjectName: '',
        day: '',
        timeSlot: ''
      })
    }
    setClassModalOpen(true)
    setError(null)
  }

  const saveClass = async () => {
    try {
      const teacherId = getCurrentTeacherId()
      if (!teacherId) return
      
      setIsLoading(true)
      setError(null)
      
      const method = editingClass ? 'PUT' : 'POST'
      const payload = editingClass 
        ? { entryId: editingClass.id, ...classFormData }
        : { teacherId, ...classFormData }
      
      const response = await fetch('/api/teacher/classes', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save class')
      }
      
      await loadTimetableEntries()
      await loadTeacherClasses() // Refresh available classes
      setClassModalOpen(false)
      alert(editingClass ? 'Class updated successfully' : 'Class added successfully')
    } catch (error: any) {
      console.error('Error saving class:', error)
      setError(error.message || 'Failed to save class')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteClass = async (entryId: string) => {
    if (!confirm('Are you sure you want to delete this class/subject combination?')) {
      return
    }
    
    try {
      setIsLoading(true)
      const response = await fetch(`/api/teacher/classes?entryId=${entryId}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete class')
      }
      
      await loadTimetableEntries()
      await loadTeacherClasses() // Refresh available classes
      alert('Class/Subject combination deleted successfully')
    } catch (error: any) {
      console.error('Error deleting class:', error)
      setError(error.message || 'Failed to delete class')
    } finally {
      setIsLoading(false)
    }
  }

  // Load data when switching to management tabs
  useEffect(() => {
    if (viewMode === 'manage-students') {
      loadAllStudents()
    } else if (viewMode === 'manage-classes') {
      loadTimetableEntries()
    }
  }, [viewMode])

  // Show loading screen while page is loading
  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#e78a53] mx-auto mb-4" />
          <p className="text-white">Loading attendance management...</p>
        </div>
      </div>
    )
  }

  // Show error if teacher not found
  if (!currentTeacher) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-4" />
          <p className="text-white">Authentication required</p>
          <p className="text-zinc-400 mt-2">Please log in as a teacher</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex">
      <TeacherSidebar />
      <main className="flex-1 overflow-auto">
        <header className="bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white">Attendance Management</h1>
                <p className="text-zinc-400 mt-2">Manage student attendance across your classes</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-[#e78a53]/10 border-[#e78a53]/30 text-[#e78a53]">
                  <Users className="h-4 w-4 mr-1" />
                  {currentTeacher?.name || 'Teacher'}
                </Badge>
                <Badge className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {availableClasses.length} Classes
                </Badge>
              </div>
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
          <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-zinc-900/50 border-zinc-800">
              <TabsTrigger value="mark" className="text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-[#e78a53]">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Attendance
              </TabsTrigger>
              <TabsTrigger value="history" className="text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-[#e78a53]">
                <History className="h-4 w-4 mr-2" />
                View History
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-[#e78a53]">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="manage-students" className="text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-[#e78a53]">
                <Users className="h-4 w-4 mr-2" />
                Manage Students
              </TabsTrigger>
              <TabsTrigger value="manage-classes" className="text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-[#e78a53]">
                <BookOpen className="h-4 w-4 mr-2" />
                Manage Classes
              </TabsTrigger>
            </TabsList>

            {/* Mark Attendance Tab */}
            <TabsContent value="mark" className="space-y-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Session Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm text-zinc-400">Date</label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="mt-1 bg-zinc-800/50 border-zinc-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">Class</label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="mt-1 bg-zinc-800/50 border-zinc-700 text-white">
                        <SelectValue placeholder="Choose class" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {availableClasses.map((cls) => (
                          <SelectItem key={cls} value={cls} className="text-white hover:bg-zinc-700">
                            {cls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">Subject</label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="mt-1 bg-zinc-800/50 border-zinc-700 text-white">
                        <SelectValue placeholder="Choose subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {availableSubjects.map((subject) => (
                          <SelectItem key={subject} value={subject} className="text-white hover:bg-zinc-700">
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end gap-2">
                    <Button onClick={markAllPresent} className="bg-green-600 hover:bg-green-700">
                      All Present
                    </Button>
                    <Button variant="outline" onClick={markAllAbsent} className="border-zinc-700">
                      All Absent
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {selectedClass && selectedSubject && (
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Students - {selectedClass} ({students.length})
                      </CardTitle>
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                        <Input
                          placeholder="Search students..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64 bg-zinc-800/50 border-zinc-700 text-white"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-[#e78a53]" />
                      </div>
                    ) : students.length === 0 ? (
                      <div className="text-center py-8 text-zinc-400">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No students found for this class</p>
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-4">
                          {students.map((student) => (
                            <div key={student._id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#e78a53]/20 rounded-full flex items-center justify-center">
                                  <Users className="h-5 w-5 text-[#e78a53]" />
                                </div>
                                <div>
                                  <p className="text-white font-medium">{student.name}</p>
                                  <p className="text-zinc-400 text-sm">Roll: {student.rollNumber} | ID: {student.studentId}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant={attendance[student._id] === 'present' ? 'default' : 'outline'}
                                  onClick={() => toggleAttendance(student._id, 'present')}
                                  className={`${attendance[student._id] === 'present' 
                                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                                    : 'border-green-600 text-green-400 hover:bg-green-600/20'
                                  }`}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Present
                                </Button>
                                <Button
                                  size="sm"
                                  variant={attendance[student._id] === 'late' ? 'default' : 'outline'}
                                  onClick={() => toggleAttendance(student._id, 'late')}
                                  className={`${attendance[student._id] === 'late' 
                                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                                    : 'border-yellow-600 text-yellow-400 hover:bg-yellow-600/20'
                                  }`}
                                >
                                  <Clock className="h-4 w-4 mr-1" />
                                  Late
                                </Button>
                                <Button
                                  size="sm"
                                  variant={attendance[student._id] === 'absent' || !attendance[student._id] ? 'default' : 'outline'}
                                  onClick={() => toggleAttendance(student._id, 'absent')}
                                  className={`${attendance[student._id] === 'absent' || !attendance[student._id] 
                                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                                    : 'border-red-600 text-red-400 hover:bg-red-600/20'
                                  }`}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Absent
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                          <div className="text-sm text-zinc-400">
                            Present: {Object.values(attendance).filter(status => status === 'present').length} | 
                            Late: {Object.values(attendance).filter(status => status === 'late').length} | 
                            Absent: {students.length - Object.values(attendance).filter(status => status === 'present' || status === 'late').length}
                          </div>
                          <Button
                            onClick={saveAttendance}
                            disabled={isLoading || students.length === 0}
                            className="bg-[#e78a53] hover:bg-[#e78a53]/90"
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-2" />
                            )}
                            Save Attendance
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div>
                    <label className="text-sm text-zinc-400">Class</label>
                    <div className="flex gap-2 mt-1">
                      <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                          <SelectValue placeholder="Choose class" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          {availableClasses.map((cls) => (
                            <SelectItem key={cls} value={cls} className="text-white hover:bg-zinc-700">
                              {cls}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedClass && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setSelectedClass('')}
                          className="px-2 border-zinc-700 text-zinc-400"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">Subject</label>
                    <div className="flex gap-2 mt-1">
                      <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                          <SelectValue placeholder="Choose subject" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          {availableSubjects.map((subject) => (
                            <SelectItem key={subject} value={subject} className="text-white hover:bg-zinc-700">
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedSubject && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setSelectedSubject('')}
                          className="px-2 border-zinc-700 text-zinc-400"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">Start Date</label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-zinc-800/50 border-zinc-700 text-white"
                      />
                      {startDate && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setStartDate('')}
                          className="px-2 border-zinc-700 text-zinc-400"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">End Date</label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-zinc-800/50 border-zinc-700 text-white"
                      />
                      {endDate && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setEndDate('')}
                          className="px-2 border-zinc-700 text-zinc-400"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={loadAttendanceHistory} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                      <History className="h-4 w-4 mr-2" />
                      Load History
                    </Button>
                  </div>
                  <div className="flex items-end">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedClass('')
                        setSelectedSubject('')
                        setStartDate('')
                        setEndDate('')
                      }}
                      className="border-zinc-700 text-zinc-400"
                    >
                      Clear All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {studentStats.length > 0 && (
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-white">Student Attendance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {studentStats.map((stat) => (
                        <div key={stat.student._id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#e78a53]/20 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-[#e78a53]" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{stat.student.firstName} {stat.student.lastName}</p>
                              <p className="text-zinc-400 text-sm">Roll: {stat.student.rollNumber}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-green-400">{stat.presentCount}</p>
                              <p className="text-xs text-zinc-400">Present</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-red-400">{stat.absentCount}</p>
                              <p className="text-xs text-zinc-400">Absent</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-[#e78a53]">{stat.attendancePercentage}%</p>
                              <p className="text-xs text-zinc-400">Attendance</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => loadStudentHistory(stat.student._id)}
                              className="border-zinc-700 text-zinc-400 hover:text-white"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">85%</p>
                        <p className="text-zinc-400 text-sm">Average Attendance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                        <Users className="h-6 w-6 text-[#e78a53]" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{students.length}</p>
                        <p className="text-zinc-400 text-sm">Total Students</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{attendanceHistory.length}</p>
                        <p className="text-zinc-400 text-sm">Classes Conducted</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Manage Students Tab */}
            <TabsContent value="manage-students" className="space-y-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Manage Students
                    </CardTitle>
                    <Button onClick={() => openStudentModal()} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Student
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-[#e78a53]" />
                    </div>
                  ) : allStudents.length === 0 ? (
                    <div className="text-center py-8 text-zinc-400">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No students found in your classes</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {allStudents.map((student) => (
                        <div key={student._id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#e78a53]/20 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-[#e78a53]" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{student.name}</p>
                              <p className="text-zinc-400 text-sm">
                                Roll: {student.rollNumber} | ID: {student.studentId} | Class: {student.section}
                              </p>
                              <p className="text-zinc-500 text-xs">{student.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openStudentModal(student)}
                              className="border-zinc-700 text-zinc-400 hover:text-white"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteStudent(student._id)}
                              className="border-red-600 text-red-400 hover:bg-red-600/20"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Manage Classes Tab */}
            <TabsContent value="manage-classes" className="space-y-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Manage Classes & Subjects
                    </CardTitle>
                    <Button onClick={() => openClassModal()} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Class/Subject
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-[#e78a53]" />
                    </div>
                  ) : timetableEntries.length === 0 ? (
                    <div className="text-center py-8 text-zinc-400">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No classes/subjects found in your timetable</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {timetableEntries.map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#e78a53]/20 rounded-full flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-[#e78a53]" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{entry.className} - {entry.subjectName}</p>
                              <p className="text-zinc-400 text-sm">{entry.day}, {entry.timeSlot}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openClassModal(entry)}
                              className="border-zinc-700 text-zinc-400 hover:text-white"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteClass(entry.id)}
                              className="border-red-600 text-red-400 hover:bg-red-600/20"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Student History Modal */}
        <Dialog open={historyModalOpen} onOpenChange={setHistoryModalOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-[#e78a53]" />
                Student Attendance History
              </DialogTitle>
            </DialogHeader>
            {selectedStudentHistory && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg">
                  <div className="w-12 h-12 bg-[#e78a53]/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-[#e78a53]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {selectedStudentHistory.student?.firstName} {selectedStudentHistory.student?.lastName}
                    </h3>
                    <p className="text-zinc-400">Roll: {selectedStudentHistory.student?.rollNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#e78a53]">{selectedStudentHistory.attendancePercentage}%</p>
                    <p className="text-zinc-400 text-sm">Overall Attendance</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-zinc-800/30 rounded-lg">
                    <p className="text-xl font-bold text-white">{selectedStudentHistory.totalClasses}</p>
                    <p className="text-zinc-400 text-sm">Total Classes</p>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-lg">
                    <p className="text-xl font-bold text-green-400">{selectedStudentHistory.presentCount}</p>
                    <p className="text-zinc-400 text-sm">Present</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                    <p className="text-xl font-bold text-yellow-400">{selectedStudentHistory.lateCount}</p>
                    <p className="text-zinc-400 text-sm">Late</p>
                  </div>
                  <div className="text-center p-4 bg-red-500/10 rounded-lg">
                    <p className="text-xl font-bold text-red-400">{selectedStudentHistory.absentCount}</p>
                    <p className="text-zinc-400 text-sm">Absent</p>
                  </div>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedStudentHistory.records?.map((record: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded">
                      <div>
                        <p className="text-white font-medium">{record.date}</p>
                        <p className="text-zinc-400 text-sm">{record.className} - {record.subjectName}</p>
                      </div>
                      <Badge 
                        className={`${
                          record.status === 'present' 
                            ? 'bg-green-500/20 border-green-500/30 text-green-400'
                            : record.status === 'late'
                            ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                            : 'bg-red-500/20 border-red-500/30 text-red-400'
                        }`}
                      >
                        {record.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Student Management Modal */}
        <Dialog open={studentModalOpen} onOpenChange={setStudentModalOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {editingStudent ? (
                  <>
                    <Edit className="h-5 w-5 text-blue-400" />
                    Edit Student
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 text-[#e78a53]" />
                    Add Student
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
                  <Label className="text-zinc-300">Name *</Label>
                  <Input
                    value={studentFormData.firstName}
                    onChange={(e) => setStudentFormData({...studentFormData, firstName: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Roll Number *</Label>
                  <Input
                    value={studentFormData.rollNumber}
                    onChange={(e) => setStudentFormData({...studentFormData, rollNumber: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Enter roll number"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-300">Student ID *</Label>
                  <Input
                    value={studentFormData.studentId}
                    onChange={(e) => setStudentFormData({...studentFormData, studentId: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Enter student ID"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Class/Section *</Label>
                  <Select 
                    value={studentFormData.section} 
                    onValueChange={(value) => setStudentFormData({...studentFormData, section: value})}
                  >
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {availableClasses.map((className) => (
                        <SelectItem key={className} value={className} className="text-white hover:bg-zinc-700">
                          {className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-300">Course *</Label>
                  <Input
                    value={studentFormData.course}
                    onChange={(e) => setStudentFormData({...studentFormData, course: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="e.g., B.Tech, B.Sc"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Branch *</Label>
                  <Input
                    value={studentFormData.branch}
                    onChange={(e) => setStudentFormData({...studentFormData, branch: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="e.g., Computer Science, Electronics"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-zinc-300">Email (optional)</Label>
                <Input
                  type="email"
                  value={studentFormData.email}
                  onChange={(e) => setStudentFormData({...studentFormData, email: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700 text-white"
                  placeholder="Enter email address (optional)"
                />
              </div>
              
              {!editingStudent && (
                <div>
                  <Label className="text-zinc-300">Password (optional)</Label>
                  <Input
                    type="password"
                    value={studentFormData.password}
                    onChange={(e) => setStudentFormData({...studentFormData, password: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="Enter password (optional)"
                  />
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStudentModalOpen(false)}
                  disabled={isLoading}
                  className="border-zinc-700 text-zinc-400 hover:text-white"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={saveStudent}
                  className="bg-[#e78a53] hover:bg-[#e78a53]/90"
                  disabled={isLoading || !studentFormData.firstName || !studentFormData.rollNumber || !studentFormData.studentId || !studentFormData.section || !studentFormData.course || !studentFormData.branch}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {isLoading 
                    ? (editingStudent ? 'Updating...' : 'Adding...')
                    : (editingStudent ? 'Update' : 'Add') + ' Student'
                  }
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Class Management Modal */}
        <Dialog open={classModalOpen} onOpenChange={setClassModalOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {editingClass ? (
                  <>
                    <Edit className="h-5 w-5 text-blue-400" />
                    Edit Class/Subject
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 text-[#e78a53]" />
                    Add Class/Subject
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
                  <Label className="text-zinc-300">Class Name</Label>
                  <Input
                    value={classFormData.className}
                    onChange={(e) => setClassFormData({...classFormData, className: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="e.g., SE-A, TE-B"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Subject Name</Label>
                  <Input
                    value={classFormData.subjectName}
                    onChange={(e) => setClassFormData({...classFormData, subjectName: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                    placeholder="e.g., Mathematics, Physics"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-300">Day</Label>
                  <Select 
                    value={classFormData.day} 
                    onValueChange={(value) => setClassFormData({...classFormData, day: value})}
                  >
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                        <SelectItem key={day} value={day} className="text-white hover:bg-zinc-700">
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-zinc-300">Time Slot</Label>
                  <Select 
                    value={classFormData.timeSlot} 
                    onValueChange={(value) => setClassFormData({...classFormData, timeSlot: value})}
                  >
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {[
                        "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
                        "12:00 - 01:00", "01:00 - 02:00", "02:00 - 03:00", "03:00 - 04:00"
                      ].map((slot) => (
                        <SelectItem key={slot} value={slot} className="text-white hover:bg-zinc-700">
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setClassModalOpen(false)}
                  disabled={isLoading}
                  className="border-zinc-700 text-zinc-400 hover:text-white"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={saveClass}
                  className="bg-[#e78a53] hover:bg-[#e78a53]/90"
                  disabled={isLoading || !classFormData.className || !classFormData.subjectName || !classFormData.day || !classFormData.timeSlot}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {isLoading 
                    ? (editingClass ? 'Updating...' : 'Adding...')
                    : (editingClass ? 'Update' : 'Add') + ' Class/Subject'
                  }
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}


