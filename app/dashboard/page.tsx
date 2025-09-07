"use client"

import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, HelpCircle, LogOut, Crown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function UserDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}!</h1>
          <p className="text-gray-400">Manage your SkillNova experience</p>
        </div>

        {/* Plan Card */}
        <Card className="glass-border bg-black/50 border-white/10">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-lime-400" />
              <CardTitle className="text-white">SkillNova Free Plan</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Upgrade for unlimited mentorship and premium roadmaps
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold">Upgrade to Pro</Button>
          </CardContent>
        </Card>

        {/* Menu Options */}
        <Card className="glass-border bg-black/50 border-white/10">
          <CardContent className="p-0">
            <div className="divide-y divide-white/10">
              <Link href="/settings" className="block">
                <div className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Settings</span>
                </div>
              </Link>

              <Link href="/faq" className="block">
                <div className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Help & FAQ</span>
                </div>
              </Link>

              <button className="w-full" onClick={handleLogout}>
                <div className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors">
                  <LogOut className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Logout</span>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/chat">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 bg-transparent">
              Back to Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
