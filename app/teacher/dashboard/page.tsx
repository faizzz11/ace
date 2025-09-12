"use client"

import React from "react"
import { TeacherSidebar } from "@/components/teacher-sidebar"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, UserCheck, UtensilsCrossed } from "lucide-react"

export default function TeacherDashboardPage() {
    return (
        <div className="min-h-screen bg-black flex">
            <TeacherSidebar />
            <main className="flex-1 overflow-auto">
                <header className="bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800">
                    <div className="px-8 py-6">
                        <h1 className="text-3xl font-bold text-white">Teacher Dashboard</h1>
                        <p className="text-zinc-400 mt-2">Quick access to teaching tools</p>
                    </div>
                </header>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/teacher/timetable">
                        <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition-colors cursor-pointer">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                                        <Calendar className="h-5 w-5 text-[#e78a53]" />
                                    </div>
                                    Timetable
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-zinc-400 text-sm">Manage and view your class schedule</CardContent>
                        </Card>
                    </Link>

                    <Link href="/teacher/attendance-management">
                        <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition-colors cursor-pointer">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                                        <UserCheck className="h-5 w-5 text-[#e78a53]" />
                                    </div>
                                    Attendance
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-zinc-400 text-sm">Update and track student attendance</CardContent>
                        </Card>
                    </Link>

                    <Link href="/teacher/food">
                        <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition-colors cursor-pointer">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                                        <UtensilsCrossed className="h-5 w-5 text-[#e78a53]" />
                                    </div>
                                    Food
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-zinc-400 text-sm">Order from the campus canteen</CardContent>
                        </Card>
                    </Link>
                </div>
            </main>
        </div>
    )
}


