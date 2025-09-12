"use client"

import React, { useMemo, useState } from "react"
import { TeacherSidebar } from "@/components/teacher-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type Student = { id: string; name: string; roll: string }

const classes = [
    { id: "cse-a", label: "CSE - A" },
    { id: "cse-b", label: "CSE - B" },
    { id: "it-a", label: "IT - A" },
]

const seed: Record<string, Student[]> = {
    "cse-a": [
        { id: "1", name: "Aarav Patel", roll: "CS-01" },
        { id: "2", name: "Diya Shah", roll: "CS-02" },
        { id: "3", name: "Kabir Mehta", roll: "CS-03" },
    ],
    "cse-b": [
        { id: "4", name: "Ishaan Rao", roll: "CS-11" },
        { id: "5", name: "Aanya Iyer", roll: "CS-12" },
    ],
    "it-a": [
        { id: "6", name: "Vihaan Das", roll: "IT-01" },
    ],
}

export default function TeacherAttendancePage() {
    const [section, setSection] = useState<string>(classes[0].id)
    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10))
    const students = useMemo(() => seed[section] || [], [section])
    const [present, setPresent] = useState<Record<string, boolean>>({})

    const toggle = (id: string) => setPresent((p) => ({ ...p, [id]: !p[id] }))
    const markAll = (value: boolean) => {
        const next: Record<string, boolean> = {}
        for (const s of students) next[s.id] = value
        setPresent(next)
    }
    const submit = () => {
        const payload = students.map((s) => ({ id: s.id, present: !!present[s.id] }))
        console.log("attendance", { date, section, payload })
        alert("Attendance saved for " + date)
    }

    return (
        <div className="min-h-screen bg-black flex">
            <TeacherSidebar />
            <main className="flex-1 overflow-auto">
                <header className="bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800">
                    <div className="px-8 py-6">
                        <h1 className="text-3xl font-bold text-white">Attendance Management</h1>
                        <p className="text-zinc-400 mt-2">Update today’s attendance</p>
                    </div>
                </header>

                <div className="p-8 space-y-6">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white">Session Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm text-zinc-400">Date</label>
                                <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-white outline-none focus:border-[#e78a53]" />
                            </div>
                            <div>
                                <label className="text-sm text-zinc-400">Section</label>
                                <Select value={section} onValueChange={setSection}>
                                    <SelectTrigger className="w-full mt-1 bg-zinc-900 border border-zinc-800 text-white">
                                        <SelectValue placeholder="Choose section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes.map((c) => (<SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end gap-2">
                                <Button onClick={() => markAll(true)} className="bg-[#e78a53] hover:bg-[#e78a53]/90">Mark All Present</Button>
                                <Button variant="outline" onClick={() => markAll(false)}>Clear</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-white">Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-zinc-400 text-sm border-b border-zinc-800">
                                            <th className="px-4 py-3">Roll</th>
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((s) => (
                                            <tr key={s.id} className="border-b border-zinc-800">
                                                <td className="px-4 py-3 text-zinc-300">{s.roll}</td>
                                                <td className="px-4 py-3 text-white">{s.name}</td>
                                                <td className="px-4 py-3">
                                                    <button onClick={() => toggle(s.id)} className={`px-3 py-1 rounded-md text-sm transition-colors ${present[s.id] ? 'bg-[#e78a53] text-black' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                                                        {present[s.id] ? 'Present' : 'Absent'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-6">
                                <Button onClick={submit} className="bg-[#e78a53] hover:bg-[#e78a53]/90">Save Attendance</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}


