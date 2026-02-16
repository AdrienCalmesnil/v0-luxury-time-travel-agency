"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const features = [
  {
    title: "Paris, 1889",
    subtitle: "La Belle Epoque",
    image: "/images/paris-1889.jpg",
    description:
      "Plongez au coeur de l'Exposition Universelle de 1889. Admirez la Tour Eiffel fraichement inauguree, deambulez dans les galeries d'art et savourez la cuisine parisienne dans les cafes les plus emblematiques de l'epoque.",
    details: ["Visite privee de la Tour Eiffel", "Diner au Moulin Rouge", "Rencontre avec Gustave Eiffel"],
  },
  {
    title: "Cretace Superieur",
    subtitle: "-68 Millions d'annees",
    image: "/images/cretaceous.jpg",
    description:
      "Une aventure au coeur de la prehistoire. Observez les dinosaures dans leur habitat naturel depuis la securite de nos capsules temporelles blindees. Un spectacle grandiose et une experience unique au monde.",
    details: ["Safari dinosaures securise", "Collecte de fossiles", "Observation volcanique"],
  },
  {
    title: "Florence, 1497",
    subtitle: "La Renaissance",
    image: "/images/florence.jpg",
    description:
      "Visitez l'atelier de Leonard de Vinci, assistez aux fresques de Michel-Ange et marchez dans les rues de la Florence des Medicis. L'apogee de l'art et de la culture europeenne s'offre a vous.",
    details: ["Atelier de Leonard de Vinci", "Audience avec les Medicis", "Cours de peinture Renaissance"],
  },
]

function FeatureRow({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
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

  const isReversed = index % 2 !== 0

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-8 md:gap-12 ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      } transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 border border-gold/10 rounded-lg" />
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2">
        <p className="mb-2 text-sm tracking-[0.3em] uppercase text-gold">
          {feature.subtitle}
        </p>
        <h3 className="font-serif text-3xl font-light text-foreground md:text-4xl">
          {feature.title}
        </h3>
        <div className="mt-4 h-px w-16 bg-gold/40" />
        <p className="mt-6 leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {feature.details.map((detail) => (
            <li key={detail} className="flex items-center gap-3 text-sm text-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function FeaturedPreviews() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm tracking-[0.3em] uppercase text-gold">
            Nos experiences
          </p>
          <h2 className="font-serif text-3xl font-light text-foreground md:text-5xl text-balance">
            Des voyages inoubliables
          </h2>
        </div>

        <div className="flex flex-col gap-24">
          {features.map((feature, i) => (
            <FeatureRow key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
