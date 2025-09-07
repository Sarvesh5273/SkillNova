import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, MessageSquare, Send } from "lucide-react"
import Link from "next/link"

export default function ChatUIPage() {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-black/80 border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <Button className="w-full bg-white/5 hover:bg-white/10 text-white border-white/10 justify-start gap-2">
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        <div className="flex-1 p-4">
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Recent Chats</div>
            <Button variant="ghost" className="w-full justify-start gap-2 text-gray-300 hover:bg-white/5">
              <MessageSquare className="w-4 h-4" />
              Career Roadmap Discussion
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-gray-300 hover:bg-white/5">
              <MessageSquare className="w-4 h-4" />
              Interview Preparation
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-gray-300 hover:bg-white/5">
              <MessageSquare className="w-4 h-4" />
              Skill Assessment
            </Button>
          </div>
        </div>

        {/* User Avatar at bottom */}
        <div className="p-4 border-t border-white/10">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-2 text-gray-300 hover:bg-white/5">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-lime-500 text-black text-xs">U</AvatarFallback>
              </Avatar>
              User Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-semibold">Hi, I'm your SkillNova Mentor…</h1>
          <p className="text-gray-400 text-sm">Ready to guide your career journey</p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Welcome Message */}
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 mt-1">
                <AvatarFallback className="bg-lime-500 text-black text-sm">SN</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white">
                    Welcome to SkillNova! I'm here to help you navigate your career journey. I can assist with career
                    planning, skill development, interview preparation, and creating personalized roadmaps. What would
                    you like to work on today?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Button className="bg-lime-500 hover:bg-lime-600 text-black">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
