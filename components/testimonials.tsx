"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Comtesse de Beaumont",
    era: "Voyageuse Paris 1889",
    quote:
      "Une experience transcendante. J'ai pu revivre la magie de l'Exposition Universelle comme si j'y etais nee. Le service etait impeccable, digne des plus grands palaces.",
    rating: 5,
  },
  {
    name: "Dr. Marcus Valerius",
    era: "Explorateur du Cretace",
    quote:
      "Observer un Tyrannosaurus Rex dans son habitat naturel est une experience que l'argent ne peut normalement pas acheter. TimeTravel Agency a rendu l'impossible possible.",
    rating: 5,
  },
  {
    name: "Isabella Corsini",
    era: "Voyageuse Florence 1497",
    quote:
      "Marcher dans les rues de la Florence des Medicis, sentir l'odeur des pigments frais dans l'atelier de Leonard... C'est un reve devenu realite.",
    rating: 5,
  },
  {
    name: "Lord Ashworth III",
    era: "Voyageur Paris 1889",
    quote:
      "La precision temporelle est remarquable. Chaque detail historique etait parfait. Je recommande sans hesitation cette agence exceptionnelle.",
    rating: 5,
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div ref={ref} className="mx-auto max-w-4xl px-6">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="mb-4 text-sm tracking-[0.3em] uppercase text-gold">
            Temoignages
          </p>
          <h2 className="font-serif text-3xl font-light text-foreground md:text-5xl text-balance">
            Ils ont voyage dans le temps
          </h2>
        </div>

        <div
          className={`relative mt-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="glass rounded-lg p-8 md:p-12 text-center">
            {/* Stars */}
            <div className="mb-6 flex items-center justify-center gap-1">
              {Array.from({ length: testimonials[current].rating }).map(
                (_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold text-gold"
                  />
                )
              )}
            </div>

            {/* Quote */}
            <blockquote className="relative">
              <span className="absolute -top-4 -left-2 font-serif text-6xl text-gold/20">
                {'"'}
              </span>
              <p className="font-serif text-xl leading-relaxed text-foreground md:text-2xl italic">
                {testimonials[current].quote}
              </p>
            </blockquote>

            {/* Author */}
            <div className="mt-8">
              <p className="font-medium text-foreground">
                {testimonials[current].name}
              </p>
              <p className="mt-1 text-sm text-gold/80">
                {testimonials[current].era}
              </p>
            </div>

            {/* Dots */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-gold"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Temoignage ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 hidden rounded-full border border-gold/20 bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-all hover:border-gold/40 hover:text-gold md:block"
            aria-label="Temoignage precedent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 hidden rounded-full border border-gold/20 bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-all hover:border-gold/40 hover:text-gold md:block"
            aria-label="Temoignage suivant"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
