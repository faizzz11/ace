"use client"

import React from "react"
import { TeacherSidebar } from "@/components/teacher-sidebar"
import { Card } from "@/components/ui/card"

const slots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 01:00",
    "01:00 - 02:00",
    "02:00 - 03:00",
    "03:00 - 04:00",
]
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const breakSlots = ["12:00 - 01:00"]

export default function TeacherTimetablePage() {
    return (
        <div className="min-h-screen bg-black flex">
            <TeacherSidebar />
            <main className="flex-1 overflow-auto">
                <header className="bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800">
                    <div className="px-8 py-6">
                        <h1 className="text-3xl font-bold text-white">Timetable</h1>
                        <p className="text-zinc-400 mt-2">Days vertically, time slots horizontally</p>
                    </div>
                </header>

                <div className="p-8">
                    <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
                        <div className="w-full overflow-x-auto">
                            <div className="min-w-[900px]">
                                <div className="grid" style={{ gridTemplateColumns: `180px repeat(${slots.length}, minmax(160px, 1fr))` }}>
                                    <div className="sticky left-0 z-10 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-300">Day / Time</div>
                                    {slots.map((s) => (
                                        <div key={s} className={`border-b border-l border-zinc-800 px-4 py-3 text-sm font-semibold ${breakSlots.includes(s) ? 'text-[#e78a53]' : 'text-zinc-300'}`}>
                                            {s}
                                            {breakSlots.includes(s) && <span className="ml-2 text-xs text-[#e78a53]/80"></span>}
                                        </div>
                                    ))}

                                    {days.map((d) => (
                                        <React.Fragment key={d}>
                                            <div className="sticky left-0 z-10 bg-zinc-900/80 backdrop-blur-sm border-t border-b border-zinc-800 px-4 py-3 text-zinc-200 font-medium">{d}</div>
                                            {slots.map((s) => (
                                                <div key={`${d}|${s}`} className={`border-t border-l border-zinc-800 px-4 py-3 ${breakSlots.includes(s) ? 'bg-zinc-800/40' : ''}`}>
                                                    {breakSlots.includes(s) ? (
                                                        <div className="flex items-center justify-center">
                                                            <span className="text-[#e78a53] font-medium">Break</span>
                                                        </div>
                                                    ) : (
                                                        <div className="text-zinc-600 text-sm">—</div>
                                                    )}
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    )
}


