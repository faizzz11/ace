"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 text-zinc-400 hover:text-[#e78a53] transition-colors duration-200 flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Home</span>
      </Link>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-[#e78a53]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#e78a53]/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Join ACE Campus</h1>
          <p className="text-zinc-400 text-lg">Choose your role to get started with our campus solution</p>
        </div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-10 text-center">Choose Your Role</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <Link href="/signup/student" className="block h-full">
              <div className="h-full p-12 bg-zinc-800/50 border border-zinc-700 rounded-2xl hover:border-[#e78a53]/50 hover:bg-[#e78a53]/5 transition-all duration-300 cursor-pointer group text-center min-w-[320px]">
                <div className="flex flex-col items-center gap-6 h-full justify-between">
                  <div className="flex flex-col items-center gap-6">
                    <div className="p-6 bg-[#e78a53]/10 rounded-2xl group-hover:bg-[#e78a53]/20 transition-colors">
                      <svg className="w-10 h-10 text-[#e78a53]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Student</h3>
                      <p className="text-zinc-400 text-base leading-relaxed">Access timetables, events, food ordering & more</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/signup/teacher" className="block h-full">
              <div className="h-full p-12 bg-zinc-800/50 border border-zinc-700 rounded-2xl hover:border-[#e78a53]/50 hover:bg-[#e78a53]/5 transition-all duration-300 cursor-pointer group text-center min-w-[320px]">
                <div className="flex flex-col items-center gap-6 h-full justify-between">
                  <div className="flex flex-col items-center gap-6">
                    <div className="p-6 bg-[#e78a53]/10 rounded-2xl group-hover:bg-[#e78a53]/20 transition-colors">
                      <svg className="w-10 h-10 text-[#e78a53]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Teacher</h3>
                      <p className="text-zinc-400 text-base leading-relaxed">Manage timetables, attendance & food orders</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/signup/canteen" className="block h-full">
              <div className="h-full p-12 bg-zinc-800/50 border border-zinc-700 rounded-2xl hover:border-[#e78a53]/50 hover:bg-[#e78a53]/5 transition-all duration-300 cursor-pointer group text-center min-w-[320px]">
                <div className="flex flex-col items-center gap-6 h-full justify-between">
                  <div className="flex flex-col items-center gap-6">
                    <div className="p-6 bg-[#e78a53]/10 rounded-2xl group-hover:bg-[#e78a53]/20 transition-colors">
                      <svg className="w-10 h-10 text-[#e78a53]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.001 3.001 0 0 1-.621-4.72L4.318 3.44A1.5 1.5 0 0 1 5.378 3h13.243a1.06 1.06 0 0 1 1.06 1.06l1.39 1.39c.354.353.354.927 0 1.28L19.682 7.22A1.5 1.5 0 0 1 18.622 8H5.378a1.5 1.5 0 0 1-1.06-1.06L3.75 6.349Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Canteen</h3>
                      <p className="text-zinc-400 text-base leading-relaxed">Manage stock, orders & food queue system</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="mt-6 text-center">
            <p className="text-zinc-400">
              Already have an account?{" "}
              <Link href="/login" className="text-[#e78a53] hover:text-[#e78a53]/80 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
