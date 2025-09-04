"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeaturesContent {
  title: string
  subtitle: string
}

const defaultContent: FeaturesContent = {
  title: "What Makes SkillNova Different ?",
  subtitle: "Discover our unique approach to 3D animation",
}

export function Features() {
  const [content, setContent] = useState<FeaturesContent>(defaultContent)

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem("skitbit-content")
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent)
        if (parsed.features) {
          setContent(parsed.features)
        }
      } catch (error) {
        console.error("Error parsing saved content:", error)
      }
    }
  }, [])

  return (
    <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        {content.title}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Adaptability Card - Hidden on mobile */}
        <Card className="hidden md:block liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <p className="tracking-widest text-neutral-400 text-lg">Personalized Mentorship</p>
            <CardTitle className="mt-1 text-xl text-white">Make the experience truly intuitive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 w-[565px]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 my-[30px]">
                <Image
                  src="/images/intuitive-1.png"
                  alt="Close-up smartphone camera module on textured leather back"
                  fill
                  className="object-cover my-[96p] leading-8 h-auto w-auto"
                  sizes="(min-width: 768px) 240px, 45vw"
                  priority={false}
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 my-[27px]">
                <Image
                  src="/images/intuitive-2.png"
                  alt="Hand gripping textured phone back — macro detail"
                  fill
                  className="object-cover my-px"
                  sizes="(min-width: 768px) 240px, 45vw"
                  priority={false}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Love Card - Always visible */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <p className="tracking-widest text-neutral-400 h-auto text-lg">Proven Results</p>
            <CardTitle className="mt-1 text-xl text-white">
              “In just 6 months, Mentor AI guided me through a clear roadmap in full stack development and I built my
              first real-world projects." — Sarvesh Bijawe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-end gap-4">
              <div className="text-5xl font-bold text-lime-300">4.9</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 fill-lime-300 text-lime-300 mx-0 py-0 h-[50px]" />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src={"/images/top-rated-2.png"}
                width={280}
                height={160}
                alt="Backpacks on stage with Smartpack PRO lighting"
                className="rounded-xl border border-white/10 object-cover w-auto h-auto my-[-10px]"
              />
              <Image
                src={"/images/top-rated-1.png"}
                width={280}
                height={160}
                alt="Backpacks on stage with Smartpack PRO lighting"
                className="rounded-xl border border-white/10 object-cover w-auto h-auto my-[-10px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
