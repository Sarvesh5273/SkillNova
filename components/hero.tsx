import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
  const buttonNew = (
    <Button asChild className="rounded-full bg-lime-400 px-6 text-black hover:bg-lime-300">
      <Link href="/login" className="inline-flex items-center gap-1">
        <span className="whitespace-nowrap">Get Started</span>
      </Link>
    </Button>
  )

  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-14 sm:py-20 text-center gap-y-6">
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">SkillNova — Your </span>
            <span className="block">
              <span className="text-lime-300 drop-shadow-[0_0_20px_rgba(132,204,22,0.35)]">AI</span>
              {" Career Mentor"}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base leading-relaxed text-white/70 text-pretty">
            Get personalized roadmaps, daily goals, and mentorship to master your career journey.
          </p>

          <div>{buttonNew}</div>

          {/* Phone grid mimic */}
          <div className="mt-10 grid w-full gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {phoneData.map((p, i) => {
              const visibility = i <= 2 ? "block" : i === 3 ? "hidden md:block" : i === 4 ? "hidden xl:block" : "hidden"

              return (
                <div key={i} className={visibility}>
                  <PhoneCard title={p.title} sub={p.sub} tone={p.tone} gradient={p.gradient} imageSrc={p.imageSrc} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneCard({
  title = "8°",
  sub = "Clear night. Great for render farm runs.",
  tone = "calm",
  gradient = "from-[#0f172a] via-[#14532d] to-[#052e16]",
  imageSrc,
}: {
  title?: string
  sub?: string
  tone?: string
  gradient?: string
  imageSrc?: string
}) {
  return (
    <div className="relative rounded-[28px] glass-border bg-neutral-900 p-2">
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl bg-black">
        <Image
          src={imageSrc ?? "/ai-career-guidance-chatbot-interface.jpg"}
          alt={`${title} - ${sub}`}
          fill
          className="absolute inset-0 h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <div className="relative z-10 p-3">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />
          <div className="space-y-1 px-1">
            <div className="mt-3 inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-lime-300">
              {tone === "calm" ? "skillnova ai" : tone}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const phoneData = [
  {
    title: "Career Guidance",
    sub: "AI-powered career path recommendations.",
    tone: "guidance",
    gradient: "from-[#0b0b0b] via-[#0f172a] to-[#020617]",
    imageSrc: "/ai-career-guidance-chatbot-interface.jpg",
  },
  {
    title: "Resume Builder",
    sub: "Smart resume optimization and tips.",
    tone: "builder",
    gradient: "from-[#0b1a0b] via-[#052e16] to-[#022c22]",
    imageSrc: "/ai-resume-builder-interface-with-suggestions.jpg",
  },
  {
    title: "Interview Prep",
    sub: "Practice with AI-powered mock interviews.",
    tone: "interview",
    gradient: "from-[#001028] via-[#0b355e] to-[#052e5e]",
    imageSrc: "/ai-interview-preparation-chatbot-conversation.jpg",
  },
  {
    title: "Skill Assessment",
    sub: "Identify strengths and growth areas.",
    tone: "assessment",
    gradient: "from-[#0b0b0b] via-[#1f2937] to-[#0b1220]",
    imageSrc: "/ai-skill-assessment-dashboard-with-career-insights.jpg",
  },
  {
    title: "Job Matching",
    sub: "Find opportunities that fit your profile.",
    tone: "matching",
    gradient: "from-[#0b0b0b] via-[#111827] to-[#052e16]",
    imageSrc: "/ai-job-matching-interface-showing-career-opportuni.jpg",
  },
]
