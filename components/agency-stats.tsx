"use client"

import { useEffect, useRef, useState } from "react"
import { Globe, Calendar, Sparkles } from "lucide-react"

const stats = [
  {
    icon: Globe,
    value: "3",
    label: "Epoques",
    description: "Trois eres soigneusement selectionnees",
  },
  {
    icon: Calendar,
    value: "250M+",
    label: "Annees",
    description: "De voyage a travers le temps",
  },
  {
    icon: Sparkles,
    value: "100%",
    label: "Immersion",
    description: "Une experience totalement immersive",
  },
]

export function AgencyStats() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="presentation" className="relative py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="mb-4 text-sm tracking-[0.3em] uppercase text-gold">
            Notre agence
          </p>
          <h2 className="font-serif text-3xl font-light leading-tight text-foreground md:text-5xl text-balance">
            {"L'excellence du voyage temporel"}
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            {"Depuis notre fondation, nous offrons a une clientele d'elite des voyages exclusifs a travers les epoques les plus marquantes de l'histoire humaine."}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`glass glass-hover group rounded-lg p-8 text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 transition-colors group-hover:border-gold/50">
                <stat.icon className="h-5 w-5 text-gold" />
              </div>
              <p className="font-serif text-4xl font-semibold text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-sm tracking-widest uppercase text-gold">
                {stat.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
