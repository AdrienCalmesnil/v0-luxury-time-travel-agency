"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, Clock, MapPin } from "lucide-react"

export function BookingCTA() {
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
    <section id="reserver" className="relative py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-4xl px-6">
        <div
          className={`glass rounded-lg p-8 md:p-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="mb-4 text-sm tracking-[0.3em] uppercase text-gold">
            Reservation
          </p>
          <h2 className="font-serif text-3xl font-light text-foreground md:text-5xl text-balance">
            Pret pour le grand saut ?
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-muted-foreground">
            {"Selectionnez votre epoque, choisissez votre date et laissez-nous vous transporter a travers le temps."}
          </p>

          {/* Booking form prototype */}
          <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <div className="flex w-full items-center gap-3 rounded-sm border border-border bg-secondary px-4 py-3 md:w-auto">
              <MapPin className="h-4 w-4 text-gold" />
              <select className="bg-transparent text-sm text-foreground outline-none" defaultValue="">
                <option value="" disabled>
                  Destination
                </option>
                <option>Paris 1889</option>
                <option>Cretace</option>
                <option>Florence 1497</option>
              </select>
            </div>

            <div className="flex w-full items-center gap-3 rounded-sm border border-border bg-secondary px-4 py-3 md:w-auto">
              <Calendar className="h-4 w-4 text-gold" />
              <input
                type="date"
                className="bg-transparent text-sm text-foreground outline-none"
                aria-label="Date de depart"
              />
            </div>

            <div className="flex w-full items-center gap-3 rounded-sm border border-border bg-secondary px-4 py-3 md:w-auto">
              <Clock className="h-4 w-4 text-gold" />
              <select className="bg-transparent text-sm text-foreground outline-none" defaultValue="1">
                <option value="1">1 voyageur</option>
                <option value="2">2 voyageurs</option>
                <option value="3">3 voyageurs</option>
                <option value="4">4 voyageurs</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <button className="gold-gradient inline-block rounded-sm px-10 py-4 text-sm font-medium tracking-widest uppercase text-background transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(197,160,89,0.3)]">
              Reserver votre saut temporel
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
