"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StudentSidebar } from "@/components/student-sidebar"
import {
  UserCheck,
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  Download
} from "lucide-react"

export default function StudentAttendancePage() {
  const subjects = [
    {
      id: 1,
      name: "Data Structures",
      code: "CS201",
      totalClasses: 45,
      attendedClasses: 42,
      percentage: 93.3,
      lastClass: "2024-01-15",
      status: "good"
    },
    {
      id: 2,
      name: "Database Management",
      code: "CS301",
      totalClasses: 38,
      attendedClasses: 28,
      percentage: 73.7,
      lastClass: "2024-01-14",
      status: "warning"
    },
    {
      id: 3,
      name: "Web Development",
      code: "CS305",
      totalClasses: 32,
      attendedClasses: 30,
      percentage: 93.8,
      lastClass: "2024-01-16",
      status: "good"
    },
    {
      id: 4,
      name: "Operating Systems",
      code: "CS401",
      totalClasses: 40,
      attendedClasses: 35,
      percentage: 87.5,
      lastClass: "2024-01-15",
      status: "good"
    },
    {
      id: 5,
      name: "Computer Networks",
      code: "CS402",
      totalClasses: 35,
      attendedClasses: 24,
      percentage: 68.6,
      lastClass: "2024-01-13",
      status: "critical"
    },
    {
      id: 6,
      name: "Software Engineering",
      code: "CS501",
      totalClasses: 42,
      attendedClasses: 38,
      percentage: 90.5,
      lastClass: "2024-01-16",
      status: "good"
    }
  ]

  const recentAttendance = [
    { date: "2024-01-16", subject: "Web Development", status: "present", time: "10:00 AM" },
    { date: "2024-01-16", subject: "Software Engineering", status: "present", time: "02:00 PM" },
    { date: "2024-01-15", subject: "Data Structures", status: "present", time: "09:00 AM" },
    { date: "2024-01-15", subject: "Operating Systems", status: "present", time: "11:00 AM" },
    { date: "2024-01-14", subject: "Database Management", status: "absent", time: "01:00 PM" },
    { date: "2024-01-13", subject: "Computer Networks", status: "absent", time: "03:00 PM" },
    { date: "2024-01-12", subject: "Data Structures", status: "present", time: "09:00 AM" },
    { date: "2024-01-12", subject: "Web Development", status: "present", time: "10:00 AM" }
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      good: "bg-green-500/10 border-green-500/30 text-green-400",
      warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
      critical: "bg-red-500/10 border-red-500/30 text-red-400"
    }
    return colors[status as keyof typeof colors] || "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      good: <CheckCircle className="h-4 w-4" />,
      warning: <AlertTriangle className="h-4 w-4" />,
      critical: <XCircle className="h-4 w-4" />
    }
    return icons[status as keyof typeof icons] || <AlertTriangle className="h-4 w-4" />
  }

  const overallAttendance = subjects.reduce((acc, subject) => {
    acc.total += subject.totalClasses
    acc.attended += subject.attendedClasses
    return acc
  }, { total: 0, attended: 0 })

  const overallPercentage = (overallAttendance.attended / overallAttendance.total * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-black flex">
      <StudentSidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="bg-zinc-900/30 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Attendance Tracker</h1>
                <p className="text-zinc-400">Monitor your class attendance and performance</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#e78a53]/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-[#e78a53]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{overallPercentage}%</p>
                    <p className="text-zinc-400 text-sm">Overall Attendance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{overallAttendance.attended}</p>
                    <p className="text-zinc-400 text-sm">Classes Attended</p>
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
                    <p className="text-2xl font-bold text-white">{overallAttendance.total}</p>
                    <p className="text-zinc-400 text-sm">Total Classes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {subjects.filter(s => s.status === 'warning' || s.status === 'critical').length}
                    </p>
                    <p className="text-zinc-400 text-sm">Subjects at Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subject-wise Attendance */}
          <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Subject-wise Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="p-4 bg-zinc-800/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(subject.status)}>
                          {getStatusIcon(subject.status)}
                          <span className="ml-1 capitalize">{subject.status}</span>
                        </Badge>
                        <div>
                          <h3 className="text-white font-semibold">{subject.name}</h3>
                          <p className="text-zinc-400 text-sm">{subject.code}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{subject.percentage}%</p>
                        <p className="text-zinc-400 text-sm">{subject.attendedClasses}/{subject.totalClasses} classes</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-700 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full ${
                          subject.percentage >= 75 
                            ? 'bg-green-500' 
                            : subject.percentage >= 65 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${subject.percentage}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Last attended: {subject.lastClass}</span>
                      <span className="text-zinc-400">
                        Required: {subject.percentage < 75 ? `${Math.ceil((subject.totalClasses * 0.75 - subject.attendedClasses) / 0.25)} more classes` : 'Met requirement'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Attendance */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAttendance.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          record.status === 'present' 
                            ? 'bg-green-500/10' 
                            : 'bg-red-500/10'
                        }`}>
                          {record.status === 'present' ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{record.subject}</p>
                          <p className="text-zinc-400 text-sm">{record.date} • {record.time}</p>
                        </div>
                      </div>
                      <Badge variant={record.status === 'present' ? 'default' : 'destructive'}>
                        {record.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Attendance Insights */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Attendance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Weekly Trend */}
                  <div>
                    <h4 className="text-zinc-300 font-medium mb-3">This Week's Performance</h4>
                    <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                      <span className="text-zinc-400">Classes This Week</span>
                      <span className="text-white font-semibold">8/10 attended</span>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-zinc-300 font-medium mb-3">Recommendations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                          <div>
                            <p className="text-yellow-400 font-medium">Attention Required</p>
                            <p className="text-zinc-300 text-sm">Computer Networks attendance is below 75%. Consider attending the next 3 classes.</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                          <div>
                            <p className="text-green-400 font-medium">Great Job!</p>
                            <p className="text-zinc-300 text-sm">Your Web Development attendance is excellent. Keep it up!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Summary */}
                  <div>
                    <h4 className="text-zinc-300 font-medium mb-3">Monthly Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">January 2024</span>
                        <span className="text-white font-semibold">85.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">December 2023</span>
                        <span className="text-white font-semibold">88.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">November 2023</span>
                        <span className="text-white font-semibold">91.3%</span>
                      </div>
                    </div>
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
