"use client";

import React, { useState } from "react";
import AiMentorUI from "@/components/ai-mentor/AiMentorUI";
import { Button } from "@/components/ui/button";
import { Briefcase, Bot, MessageSquare, Phone, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AiMentor = () => {
  const [isMockInterview, setIsMockInterview] = useState(false);
  const mockInterviewAssistantId = "8714485c-f553-4a8d-849f-239426e328b0";

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-white p-8 shadow-sm border border-slate-200">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-600">AI-Powered Learning</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-800">AI Mentor</h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              {isMockInterview
                ? "Practice your interview skills with our AI interviewer"
                : "Talk with your personal AI mentor on the phone"}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm border border-slate-200">
            <Button
              variant={isMockInterview ? "ghost" : "default"}
              className={cn(
                "flex items-center gap-2 transition-all duration-200",
                isMockInterview ? "text-slate-600 hover:text-slate-900" : "bg-indigo-600 text-white hover:bg-indigo-700"
              )}
              onClick={() => setIsMockInterview(false)}
            >
              <Bot className="h-4 w-4" />
              <span>AI Mentor</span>
            </Button>

            <div className="h-6 w-px bg-slate-200" />

            <Button
              variant={isMockInterview ? "default" : "ghost"}
              className={cn(
                "flex items-center gap-2 transition-all duration-200",
                isMockInterview ? "bg-indigo-600 text-white hover:bg-indigo-700" : "text-slate-600 hover:text-slate-900"
              )}
              onClick={() => setIsMockInterview(true)}
            >
              <Briefcase className="h-4 w-4" />
              <span>Mock Interview</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="group bg-white border-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
              <Phone className="h-6 w-6 text-indigo-600" />
            </div>
            <CardTitle className="text-lg font-semibold">Voice Interaction</CardTitle>
            <CardDescription className="text-slate-500">Natural conversation through phone calls</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              Speak naturally and get instant responses from your AI mentor
            </p>
          </CardContent>
        </Card>

        <Card className="group bg-white border-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
              <MessageSquare className="h-6 w-6 text-indigo-600" />
            </div>
            <CardTitle className="text-lg font-semibold">Personalized Guidance</CardTitle>
            <CardDescription className="text-slate-500">Tailored to your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              Get customized advice and support for your educational journey
            </p>
          </CardContent>
        </Card>

        <Card className="group bg-white border-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <CardTitle className="text-lg font-semibold">Mock Interviews</CardTitle>
            <CardDescription className="text-slate-500">Practice makes perfect</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              Prepare for real interviews with AI-powered mock sessions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Card */}
      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <AiMentorUI assistantId={isMockInterview ? mockInterviewAssistantId : undefined} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AiMentor;
