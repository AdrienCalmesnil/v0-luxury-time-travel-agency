"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image with Ken Burns animation */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-[-10%] transition-transform duration-[2000ms] ${
            loaded ? "animate-ken-burns" : "scale-110"
          }`}
        >
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      {/* Animated gold particles (decorative) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold/20"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 8 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          className={`mb-6 text-sm tracking-[0.3em] uppercase text-gold transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Agence de voyage temporel de luxe
        </p>

        <h1
          className={`font-serif text-5xl font-light leading-tight tracking-wide text-foreground md:text-7xl lg:text-8xl transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-balance">
            Voyagez au-dela{" "}
            <span className="gold-text italic">du temps</span>
          </span>
        </h1>

        <p
          className={`mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg transition-all duration-1000 delay-400 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {"Decouvrez les epoques les plus fascinantes de l'histoire dans un confort absolu. Une experience immersive, exclusive et inoubliable."}
        </p>

        <div
          className={`mt-10 transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#destinations"
            className="gold-gradient inline-block rounded-sm px-10 py-4 text-sm font-medium tracking-widest uppercase text-background transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(197,160,89,0.3)]"
          >
            Explorer les destinations
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#presentation"
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-gold"
          aria-label="Defiler vers le bas"
        >
          <span className="text-xs tracking-widest uppercase">Defiler</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-5px); opacity: 0.4; }
          75% { transform: translateY(-30px) translateX(15px); opacity: 0.5; }
        }
        @keyframes ken-burns {
          0% {
            transform: scale(1.1) translate(0%, 0%);
          }
          25% {
            transform: scale(1.18) translate(-1.5%, -1%);
          }
          50% {
            transform: scale(1.14) translate(1%, -0.5%);
          }
          75% {
            transform: scale(1.2) translate(-0.5%, 1%);
          }
          100% {
            transform: scale(1.1) translate(0%, 0%);
          }
        }
        .animate-ken-burns {
          animation: ken-burns 25s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
