"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const destinations = [
  {
    id: "paris-1889",
    title: "Paris 1889",
    subtitle: "Exposition Universelle",
    image: "/images/paris-1889.jpg",
    year: "1889",
    description:
      "Vivez l'inauguration de la Tour Eiffel et l'effervescence de la Belle Epoque parisienne.",
  },
  {
    id: "cretace",
    title: "Cretace",
    subtitle: "Ere des Dinosaures",
    image: "/images/cretaceous.jpg",
    year: "-68M",
    description:
      "Explorez un monde primitif ou les dinosaures regnent en maitres sur la Terre.",
  },
  {
    id: "florence",
    title: "Florence",
    subtitle: "Renaissance Italienne",
    image: "/images/florence.jpg",
    year: "1497",
    description:
      "Rencontrez les plus grands artistes de l'histoire dans la Florence des Medicis.",
  },
]

export function DestinationGallery() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="destinations" className="relative py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="mb-4 text-sm tracking-[0.3em] uppercase text-gold">
            Destinations
          </p>
          <h2 className="font-serif text-3xl font-light text-foreground md:text-5xl text-balance">
            Choisissez votre epoque
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {destinations.map((dest, i) => (
            <div
              key={dest.id}
              className={`group relative overflow-hidden rounded-lg transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={dest.image}
                  alt={`Destination ${dest.title}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500">
                  {/* Year badge */}
                  <div className="mb-auto">
                    <span className="inline-block rounded-sm border border-gold/30 bg-background/50 px-3 py-1 text-xs tracking-widest uppercase text-gold backdrop-blur-sm">
                      {dest.year}
                    </span>
                  </div>

                  {/* Timeline accent */}
                  <div className="mb-3 h-px w-12 bg-gold transition-all duration-500 group-hover:w-20" />

                  <h3 className="font-serif text-2xl font-semibold text-foreground">
                    {dest.title}
                  </h3>
                  <p className="mt-1 text-sm tracking-wider uppercase text-gold/80">
                    {dest.subtitle}
                  </p>

                  {/* Description - shows on hover */}
                  <div className="mt-3 max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-40">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {dest.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-gold transition-all duration-300 group-hover:gap-3">
                      Decouvrir
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
