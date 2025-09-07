export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SkillNova",
    url: "https://skillnova.ai",
    logo: "https://skillnova.ai/logo.png",
    description:
      "SkillNova is an AI-powered career guidance platform that helps professionals navigate their career journeys with personalized insights and recommendations.",
    sameAs: [
      "https://www.instagram.com/skillnova",
      "https://www.linkedin.com/company/skillnova",
      "https://twitter.com/skillnova",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-555-SKILL-AI",
        contactType: "customer service",
      },
    ],
    areaServed: [
      { "@type": "Place", name: "United States" },
      { "@type": "Place", name: "Canada" },
      { "@type": "Place", name: "United Kingdom" },
      { "@type": "Place", name: "Australia" },
      { "@type": "Place", name: "Global" },
    ],
  }

  return (
    <>
      {/* SEO Schema for Google + LLMs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-6 md:px-12 lg:px-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">About SkillNova</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Empowering careers through AI-driven guidance and personalized insights.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="py-16 bg-neutral-900 text-white px-6 md:px-12 lg:px-20">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              title: "AI Career Guidance",
              desc: "Personalized career recommendations powered by advanced AI algorithms and industry insights.",
            },
            {
              title: "Global Reach",
              desc: "Serving professionals worldwide with localized career advice and job market insights.",
            },
            {
              title: "Smart Technology",
              desc: "Using cutting-edge natural language processing and machine learning for career optimization.",
            },
            {
              title: "Resume Optimization",
              desc: "AI-powered resume analysis and suggestions to maximize your job application success.",
            },
            {
              title: "Interview Preparation",
              desc: "Practice with our AI interviewer to build confidence and improve your interview skills.",
            },
            {
              title: "Skill Assessment",
              desc: "Comprehensive skill evaluation to identify strengths and areas for professional growth.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-neutral-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="opacity-80">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-center text-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
        <p className="text-lg opacity-80 mb-8">Let SkillNova guide you to your next career milestone.</p>
        <a
          href="/contact"
          className="bg-lime-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-lime-300 transition-all"
        >
          Start Your Journey
        </a>
      </section>
    </>
  )
}
