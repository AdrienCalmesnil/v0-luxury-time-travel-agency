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

const responses: Record<string, string[]> = {
  paris: [
    "Ah, Paris 1889 ! L'une de nos destinations les plus prisees. Imaginez-vous deambulant au pied de la Tour Eiffel, tout juste inauguree pour l'Exposition Universelle. Gustave Eiffel lui-meme pourrait vous faire visiter son appartement au sommet ! La Belle Epoque dans toute sa splendeur, avec les cafes de Montmartre, les premiers spectacles du Moulin Rouge, et une effervescence culturelle incomparable. Je vous recommande notre formule \"Nuit Parisienne\" qui inclut un diner au premier etage de la Tour.",
    "Paris durant l'Exposition Universelle de 1889, c'est 32 millions de visiteurs venus du monde entier ! Vous pourrez admirer les dernieres innovations technologiques de l'epoque, gouter la cuisine des grands chefs parisiens, et assister a des spectacles qui ont marque l'histoire. Notre forfait inclut des vetements d'epoque sur mesure et un guide bilingue. C'est tout simplement magique !",
  ],
  dinosaure: [
    "Le Cretace, il y a 65 millions d'annees ! C'est notre destination la plus spectaculaire. Vous observerez des Tyrannosaurus Rex dans leur habitat naturel, des troupeaux de Triceratops, et des forets prehistoriques d'une beaute a couper le souffle. Rassurez-vous, nos capsules temporelles sont equipees de champs de protection avances. Vous serez en securite totale tout en vivant l'aventure la plus intense de votre vie !",
    "Notre safari au Cretace est une experience unique ! Imaginez : des forets de fougeres geantes, des volcans fumants a l'horizon, et les creatures les plus majestueuses ayant jamais foule cette planete. Nos guides paleontologues vous accompagnent dans des vehicules blindes et invisibles. C'est l'aventure ultime pour les amoureux de la nature et de l'histoire de la Terre.",
  ],
  florence: [
    "Florence en 1504, au coeur de la Renaissance italienne ! Vous pourriez croiser Michel-Ange en plein travail sur le David, observer Leonard de Vinci dans son atelier, ou assister a un banquet organise par les Medicis. L'art, l'architecture, la gastronomie toscane... chaque recoin de la ville est un chef-d'oeuvre vivant. Notre formule \"Artiste Florentin\" vous permet meme de participer a un atelier de peinture avec les grands maitres !",
    "La Florence de la Renaissance, c'est le berceau de l'art occidental ! En 1504, la ville bouillonne de creativite. Vous decouvrirez les fresques en cours de realisation, les debats philosophiques sur les places publiques, et les ateliers des plus grands artistes de l'histoire. Notre forfait premium inclut une rencontre privee avec Laurent de Medicis. Une immersion culturelle sans precedent !",
  ],
  destinations: [
    "Nous proposons actuellement trois destinations extraordinaires :\n\n- Paris 1889 : La Belle Epoque et l'Exposition Universelle, avec la Tour Eiffel toute neuve !\n- Cretace (-65M d'annees) : Un safari prehistorique parmi les dinosaures, dans des forets primordiales.\n- Florence 1504 : Le coeur de la Renaissance italienne, avec Michel-Ange et Leonard de Vinci.\n\nChaque destination offre une immersion complete avec vetements d'epoque, guide specialise et protection temporelle. Laquelle vous tente le plus ?",
  ],
  bonjour: [
    "Bienvenue chez TimeTravel Agency ! C'est un plaisir de vous accueillir. Je suis Chronos, votre guide a travers les epoques. Que vous soyez passionne d'histoire, amateur de sensations fortes ou amoureux de l'art, nous avons la destination temporelle parfaite pour vous. Par ou souhaitez-vous commencer ?",
  ],
  prix: [
    "Nos tarifs dependent de la destination et de la formule choisie. Je vous invite a prendre rendez-vous avec l'un de nos conseillers temporels pour un devis personnalise. Vous pouvez reserver une consultation gratuite via notre section \"Reserver votre voyage\". Sachez que nous proposons egalement des facilites de paiement sur plusieurs dimensions temporelles !",
  ],
  securite: [
    "La securite est notre priorite absolue ! Nos capsules temporelles sont equipees des dernieres technologies de protection : champs d'invisibilite, boucliers energetiques et systeme de retour d'urgence instantane. Chaque voyageur recoit une formation complete avant le depart, et nos guides certifies vous accompagnent a chaque instant. En 15 000 voyages, nous n'avons eu aucun incident. Vous etes entre de bonnes mains !",
  ],
  reservation: [
    "Pour reserver votre voyage temporel, rien de plus simple ! Rendez-vous dans notre section \"Reserver votre voyage\" en bas de page, ou contactez directement l'un de nos conseillers. Nous vous guiderons dans le choix de la destination, de la formule et des options. Un acompte de 30% confirme votre reservation. L'aventure n'attend que vous !",
  ],
  comment: [
    "Excellent question ! Notre technologie de voyage temporel utilise des capsules chronodynamiques de derniere generation. Le processus est simple : vous choisissez votre destination, nous preparons votre immersion (vetements, langue, contexte historique), puis vous embarquez pour un voyage aussi confortable qu'un vol en premiere classe. Le deplacement temporel lui-meme ne dure que quelques secondes de votre temps subjectif !",
  ],
}

function findResponse(input: string): string {
  const lower = input.toLowerCase()

  const keywords: [string[], string][] = [
    [["paris", "1889", "eiffel", "belle epoque", "exposition"], "paris"],
    [["dinosaure", "cretace", "t-rex", "tyrannosaure", "prehist", "safari", "dino"], "dinosaure"],
    [["florence", "renaissance", "michel-ange", "michelange", "medici", "vinci", "1504", "itali"], "florence"],
    [["destination", "proposez", "ou aller", "choix", "catalogue", "quelles"], "destinations"],
    [["bonjour", "salut", "hello", "coucou", "hey", "bonsoir"], "bonjour"],
    [["prix", "tarif", "cout", "combien", "cher", "budget"], "prix"],
    [["securite", "danger", "risque", "sur", "protection", "securise"], "securite"],
    [["reserver", "reservation", "book", "rendez-vous", "rdv", "inscription"], "reservation"],
    [["comment", "fonctionne", "marche", "technologie", "capsule", "processus"], "comment"],
  ]

  for (const [keys, category] of keywords) {
    if (keys.some((k) => lower.includes(k))) {
      const options = responses[category]
      return options[Math.floor(Math.random() * options.length)]
    }
  }

  const fallbacks = [
    "Quelle belle question ! Je serais ravi de vous en dire plus. Pourriez-vous preciser votre demande ? Souhaitez-vous en savoir plus sur l'une de nos destinations (Paris 1889, Cretace, Florence 1504), nos tarifs ou notre technologie de voyage temporel ?",
    "Je suis passionne par toutes les epoques ! Pour mieux vous orienter, dites-moi : etes-vous plutot attire par l'art et la culture, l'aventure et la nature, ou l'elegance d'une epoque revolue ? Je trouverai la destination ideale pour vous.",
    "Merci pour votre interet ! Chez TimeTravel Agency, chaque voyage est une experience unique. N'hesitez pas a me poser des questions sur nos trois destinations phares, ou a me decrire le type d'experience qui vous fait rever. Je suis la pour vous guider a travers le temps !",
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
  const msgIdRef = useRef(0)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return

      const userMsg: Message = {
        id: `msg-${++msgIdRef.current}`,
        role: "user",
        text: text.trim(),
      }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setIsTyping(true)

      const delay = 800 + Math.random() * 1200
      setTimeout(() => {
        const reply = findResponse(text)
        const botMsg: Message = {
          id: `msg-${++msgIdRef.current}`,
          role: "assistant",
          text: reply,
        }
        setMessages((prev) => [...prev, botMsg])
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
