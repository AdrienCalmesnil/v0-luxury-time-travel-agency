"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { MessageCircle, X, Send, Clock } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  text: string
}

const quickReplies = [
  "Quelles destinations proposez-vous ?",
  "Parlez-moi de Paris 1889",
  "Je veux voir des dinosaures !",
  "Florence et la Renaissance",
]

function generateChronosResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase()

  if (
    msg.includes("destination") ||
    msg.includes("proposez") ||
    msg.includes("voyage") ||
    msg.includes("ou aller") ||
    msg.includes("où aller") ||
    msg.includes("quoi visiter")
  ) {
    return "Nous proposons trois destinations d'exception !\n\n- Paris 1889 : Vivez l'inauguration de la Tour Eiffel et l'Exposition Universelle, au coeur de la Belle Epoque.\n\n- Cretace -65M : Une expedition au milieu des dinosaures, dans une nature prehistorique a couper le souffle.\n\n- Florence 1504 : Plongez dans la Renaissance italienne, croisez Michel-Ange et admirez la naissance du David.\n\nQuelle epoque vous attire le plus ?"
  }

  if (
    msg.includes("paris") ||
    msg.includes("1889") ||
    msg.includes("eiffel") ||
    msg.includes("belle epoque") ||
    msg.includes("belle époque") ||
    msg.includes("exposition universelle")
  ) {
    return "Ah, Paris 1889... une epoque absolument fascinante ! Vous assisterez a l'inauguration de la Tour Eiffel lors de l'Exposition Universelle. Imaginez : les lumieres de la Ville Lumiere qui s'allument pour la premiere fois a l'electricite, les cafes de Montmartre, l'effervescence artistique... Gustave Eiffel en personne accueille les visiteurs au sommet de sa tour. C'est notre destination la plus romantique. Le forfait inclut une tenue d'epoque et une visite privee de l'Exposition. Souhaitez-vous en savoir plus sur les tarifs ?"
  }

  if (
    msg.includes("dinosaure") ||
    msg.includes("cretace") ||
    msg.includes("crétacé") ||
    msg.includes("t-rex") ||
    msg.includes("prehisto") ||
    msg.includes("préhisto") ||
    msg.includes("jurassic")
  ) {
    return "Le Cretace, il y a 65 millions d'annees... notre destination la plus spectaculaire ! Vous observerez des Tyrannosaurus Rex, des Triceratops et des Pteranodons dans leur habitat naturel. La vegetation luxuriante, les volcans a l'horizon, les fougeres geantes... c'est un spectacle inoubliable. Rassurez-vous, nos bulles temporelles garantissent une securite absolue. Vous serez invisible et protege tout au long de l'expedition. C'est l'aventure ultime pour les amoureux de la nature et de la science !"
  }

  if (
    msg.includes("florence") ||
    msg.includes("renaissance") ||
    msg.includes("1504") ||
    msg.includes("michel-ange") ||
    msg.includes("michelangelo") ||
    msg.includes("medicis") ||
    msg.includes("médicis") ||
    msg.includes("italie") ||
    msg.includes("art")
  ) {
    return "Florence 1504, le berceau de la Renaissance ! Vous arriverez au moment precis ou Michel-Ange devoile son David, un chef-d'oeuvre qui va revolutionner l'histoire de l'art. Promenez-vous dans les ateliers des plus grands maitres, admirez le Ponte Vecchio et les palais des Medicis dans toute leur splendeur. Leonard de Vinci travaille encore dans la region a cette epoque... Nos guides locaux, formes a l'etiquette florentine du XVIe siecle, vous accompagnent pour une immersion totale."
  }

  if (
    msg.includes("prix") ||
    msg.includes("tarif") ||
    msg.includes("cout") ||
    msg.includes("coût") ||
    msg.includes("combien") ||
    msg.includes("reserver") ||
    msg.includes("réserver") ||
    msg.includes("booking") ||
    msg.includes("payer")
  ) {
    return "Nos forfaits sont personnalises selon la destination et la duree du sejour temporel. Pour Paris 1889, comptez a partir de 15 000 TC (Temporal Credits). Le Cretace, en raison de la complexite du saut temporel, debute a 25 000 TC. Florence 1504 est disponible des 18 000 TC. Chaque forfait inclut la tenue d'epoque, un guide temporel certifie et notre assurance paradoxe. Souhaitez-vous que je vous oriente vers notre equipe de reservation ?"
  }

  if (
    msg.includes("securite") ||
    msg.includes("sécurité") ||
    msg.includes("danger") ||
    msg.includes("risque") ||
    msg.includes("paradoxe") ||
    msg.includes("sûr")
  ) {
    return "La securite est notre priorite absolue ! Chaque voyageur est protege par une bulle temporelle de derniere generation qui vous rend invisible et intangible dans l'epoque visitee. Aucun risque de paradoxe temporel : notre technologie empeche toute interaction qui pourrait modifier le cours de l'histoire. Nous avons effectue plus de 12 400 voyages sans le moindre incident. Vous pouvez voyager l'esprit tranquille !"
  }

  if (
    msg.includes("bonjour") ||
    msg.includes("salut") ||
    msg.includes("hello") ||
    msg.includes("bonsoir") ||
    msg.includes("coucou")
  ) {
    return "Bonjour et bienvenue chez TimeTravel Agency ! Je suis ravi de vous accueillir. Que vous reveniez d'art, d'aventure prehistorique ou d'elegance parisienne, nous avons la destination temporelle parfaite pour vous. Qu'est-ce qui vous ferait rever aujourd'hui ?"
  }

  if (
    msg.includes("merci") ||
    msg.includes("super") ||
    msg.includes("genial") ||
    msg.includes("génial") ||
    msg.includes("parfait") ||
    msg.includes("excellent")
  ) {
    return "Je vous en prie, c'est un plaisir ! N'hesitez pas si vous avez d'autres questions sur nos destinations ou nos services. Le temps est notre specialite, et nous avons tout le temps du monde pour vous aider a trouver le voyage parfait !"
  }

  if (
    msg.includes("nature") ||
    msg.includes("animal") ||
    msg.includes("aventure") ||
    msg.includes("science")
  ) {
    return "Avec votre gout pour la nature et l'aventure, je vous recommande vivement notre expedition au Cretace ! 65 millions d'annees avant notre ere, la Terre est un veritable paradis naturel. Des forets immenses, une faune spectaculaire et des paysages volcaniques a perte de vue. C'est l'aventure scientifique ultime !"
  }

  if (
    msg.includes("culture") ||
    msg.includes("musee") ||
    msg.includes("musée") ||
    msg.includes("peinture") ||
    msg.includes("sculpture")
  ) {
    return "Pour un amateur de culture et d'art, Florence 1504 est une evidence ! Imaginez pouvoir observer Michel-Ange, Leonard de Vinci et Raphael dans leurs ateliers. La Renaissance italienne est le plus grand bouillonnement artistique de l'histoire humaine. Un voyage qui transforme a jamais votre regard sur l'art !"
  }

  if (
    msg.includes("romantique") ||
    msg.includes("couple") ||
    msg.includes("amour") ||
    msg.includes("elegance") ||
    msg.includes("élégance") ||
    msg.includes("mode") ||
    msg.includes("gastronomie")
  ) {
    return "Pour une experience romantique et elegante, Paris 1889 est la destination ideale ! La Ville Lumiere au sommet de sa splendeur, les grands boulevards, les cafes litteraires, et bien sur, l'inauguration de la Tour Eiffel sous un ciel etoile. C'est le voyage parfait en couple !"
  }

  const fallbacks = [
    "Quelle belle question ! Pour mieux vous conseiller, pourriez-vous me dire ce qui vous passionne le plus : l'histoire, la nature ou l'art ? Nos trois destinations -- Paris 1889, le Cretace et Florence 1504 -- offrent chacune une experience unique et inoubliable.",
    "Je serais ravi de vous aider a choisir votre prochaine aventure temporelle ! Etes-vous plutot attire par l'elegance de la Belle Epoque parisienne, les mysteres du monde prehistorique, ou le genie artistique de la Renaissance florentine ?",
    "Excellente reflexion ! Chez TimeTravel Agency, nous croyons que chaque epoque a quelque chose d'unique a offrir. Dites-moi ce qui vous fait rever et je vous guiderai vers la destination parfaite. Paris 1889, le Cretace ou Florence 1504 ?",
  ]
  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Bonjour ! Je suis Chronos, votre assistant temporel. Comment puis-je vous aider a planifier votre prochain voyage dans le temps ?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const msgCounter = useRef(0)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return

      const userMsg: Message = {
        id: `user-${++msgCounter.current}`,
        role: "user",
        text: text.trim(),
      }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setIsTyping(true)

      const delay = 600 + Math.random() * 800
      setTimeout(() => {
        const response = generateChronosResponse(text)
        const assistantMsg: Message = {
          id: `assistant-${++msgCounter.current}`,
          role: "assistant",
          text: response,
        }
        setMessages((prev) => [...prev, assistantMsg])
        setIsTyping(false)
      }, delay)
    },
    [isTyping]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  const showQuickReplies = messages.length <= 2 && !isTyping

  return (
    <>
      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 overflow-hidden rounded-lg border border-gold/20 bg-card shadow-2xl shadow-background/50 transition-all duration-300 md:w-96 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border bg-secondary px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full gold-gradient">
            <Clock className="h-4 w-4 text-background" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Chronos</p>
            <p className="text-xs text-muted-foreground">
              {isTyping ? "En train d'ecrire..." : "Assistant temporel"}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fermer le chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-72 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "gold-gradient text-background"
                    : "bg-secondary text-foreground"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-lg bg-secondary px-4 py-2">
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        {showQuickReplies && (
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSend(reply)}
                className="rounded-sm border border-gold/20 px-3 py-1 text-xs text-gold transition-all hover:border-gold/40 hover:bg-gold/10"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Votre question..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="flex h-8 w-8 items-center justify-center rounded-full gold-gradient text-background transition-transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
            aria-label="Envoyer"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gold-gradient shadow-lg shadow-gold/20 transition-all duration-300 hover:scale-110 hover:shadow-gold/40"
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-background" />
        ) : (
          <MessageCircle className="h-5 w-5 text-background" />
        )}
      </button>
    </>
  )
}
