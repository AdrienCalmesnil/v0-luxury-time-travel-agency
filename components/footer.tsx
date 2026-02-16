import { Clock } from "lucide-react"

const quickLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Destinations", href: "#destinations" },
  { label: "Experiences", href: "#experiences" },
  { label: "Reserver", href: "#reserver" },
]

const legal = [
  { label: "Mentions legales", href: "#" },
  { label: "Politique de confidentialite", href: "#" },
  { label: "CGV", href: "#" },
  { label: "Paradoxe temporel - FAQ", href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gold" />
              <span className="font-serif text-lg font-semibold text-foreground">
                TimeTravel
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {"Agence de voyage temporel de luxe. L'excellence au service de l'extraordinaire."}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-xs tracking-[0.2em] uppercase text-gold">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-xs tracking-[0.2em] uppercase text-gold">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs tracking-[0.2em] uppercase text-gold">
              Contact
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>info@timetravel-agency.com</li>
              <li>+33 1 00 00 00 00</li>
              <li>Paris, France - Hors du temps</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {"2026 TimeTravel Agency. Tous droits reserves a travers le temps."}
          </p>
          <div className="flex items-center gap-6">
            {["Instagram", "Twitter", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-gold"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
