import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { AppverseFooter } from "@/components/appverse-footer"
import { FaqSection } from "@/components/faq-section"
import Script from "next/script"

// ✅ Force static generation for low TTFB
export const dynamic = "force-static"

export default function Page() {
  const pricingStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "@id": "https://skillnova.com/#pricing",
    name: "SkillNova Pricing Plans",
    description: "AI Career Mentorship pricing plans - Free, Pro, and Enterprise packages for career development",
    url: "https://skillnova.com/#pricing",
    mainEntity: {
      "@type": "PriceSpecification",
      name: "SkillNova AI Career Mentorship",
      description: "Professional AI career mentorship services with three pricing tiers",
      offers: [
        {
          "@type": "Offer",
          name: "Free Plan",
          price: "0",
          priceCurrency: "USD",
          description: "Basic career guidance with limited mentorship sessions",
        },
        {
          "@type": "Offer",
          name: "Pro Plan",
          price: "29",
          priceCurrency: "USD",
          description: "Unlimited mentorship, premium roadmaps, and advanced goal tracking",
        },
        {
          "@type": "Offer",
          name: "Enterprise Plan",
          price: "99",
          priceCurrency: "USD",
          description: "Custom AI models, team management, and priority support",
        },
      ],
    },
  }

  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://skillnova.com/",
    name: "SkillNova | Your AI Career Mentor",
    description:
      "Get personalized roadmaps, daily goals, and mentorship to master your career journey with SkillNova's AI-powered career guidance.",
    url: "https://skillnova.com/",
    mainEntity: {
      "@type": "Organization",
      name: "SkillNova",
      url: "https://skillnova.com",
      sameAs: [
        "https://twitter.com/skillnova",
        "https://www.youtube.com/@skillnova",
        "https://instagram.com/skillnova",
        "https://threads.com/skillnova",
      ],
    },
    hasPart: [
      {
        "@type": "WebPageElement",
        "@id": "https://skillnova.com/#pricing",
        name: "Pricing Section",
        url: "https://skillnova.com/#pricing",
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <Features />
        <Pricing />
        <FaqSection />
        <AppverseFooter />
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingStructuredData),
        }}
      />

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  )
}
