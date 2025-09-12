"use client"

import React from "react"
import Link from "next/link"
import { useMemo } from "react"
import { Card } from "@/components/ui/card"

type TimeSlot = string
type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

type Entry = {
    day: Day
    time: TimeSlot
    subject: string
    teacher: string
}

const config = {
    timeSlots: [
        "08:00 - 09:00",
        "09:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 01:00",
        "01:00 - 02:00",
        "02:00 - 03:00",
        "03:00 - 04:00",
    ] as TimeSlot[],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as Day[],
    entries: [
        { day: "Monday", time: "08:00 - 09:00", subject: "Data Structures", teacher: "Prof. Sharma" },
        { day: "Monday", time: "09:00 - 10:00", subject: "Mathematics", teacher: "Dr. Verma" },
        { day: "Tuesday", time: "10:00 - 11:00", subject: "Operating Systems", teacher: "Prof. Rao" },
        { day: "Wednesday", time: "11:00 - 12:00", subject: "DBMS", teacher: "Dr. Singh" },
        { day: "Thursday", time: "12:00 - 01:00", subject: "Computer Networks", teacher: "Prof. Iyer" },
        { day: "Friday", time: "02:00 - 03:00", subject: "Web Development", teacher: "Ms. Khan" },
        { day: "Saturday", time: "01:00 - 02:00", subject: "Elective", teacher: "TBD" },
    ] as Entry[],
}

export default function StudentTimetablePage() {
    const matrix = useMemo(() => {
        const map = new Map<string, Entry>()
        for (const e of config.entries) map.set(`${e.day}|${e.time}`, e)
        return map
    }, [])

    return (
        <div className="min-h-screen bg-black">
            <header className="bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-baseline gap-3">
                        <Link href="/student/dashboard" className="text-[#e78a53] font-semibold">Dashboard</Link>
                        <span className="text-zinc-500">/</span>
                        <span className="text-white font-bold">Timetable</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white">Weekly Timetable</h1>
                    <p className="text-zinc-400">Days vertically, time slots horizontally</p>
                </div>

                <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[900px]">
                            <div className="grid" style={{ gridTemplateColumns: `180px repeat(${config.timeSlots.length}, minmax(160px, 1fr))` }}>
                                <div className="sticky left-0 z-10 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-300">Day / Time</div>
                                {config.timeSlots.map((slot) => (
                                    <div key={slot} className="border-b border-l border-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-300">
                                        {slot}
                                    </div>
                                ))}

                                {config.days.map((day) => (
                                    <React.Fragment key={day}>
                                        <div className="sticky left-0 z-10 bg-zinc-900/80 backdrop-blur-sm border-t border-b border-zinc-800 px-4 py-3 text-zinc-200 font-medium">{day}</div>
                                        {config.timeSlots.map((slot) => {
                                            const key = `${day}|${slot}`
                                            const cell = matrix.get(key)
                                            return (
                                                <div key={key} className="border-t border-l border-zinc-800 px-4 py-3">
                                                    {cell ? (
                                                        <div className="space-y-1">
                                                            <div className="text-white font-semibold tracking-wide">{cell.subject}</div>
                                                            <div className="text-xs text-[#e78a53]">{cell.teacher}</div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-zinc-600 text-sm">—</div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    )
}


