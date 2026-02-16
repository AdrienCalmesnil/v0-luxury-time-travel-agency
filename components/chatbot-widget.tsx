"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Clock } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "bot" | "user"
}

const quickReplies = [
  "Quelles destinations ?",
  "Tarifs et forfaits",
  "Securite temporelle",
  "Reserver maintenant",
]

const botResponses: Record<string, string> = {
  "Quelles destinations ?":
    "Nous proposons actuellement 3 destinations fascinantes : Paris 1889 pour la Belle Epoque, le Cretace Superieur pour les amateurs de dinosaures, et Florence 1497 pour les passionnes de la Renaissance.",
  "Tarifs et forfaits":
    "Nos forfaits commencent a partir de 50 000 pour un voyage solo. Les tarifs varient selon la destination et la duree du sejour. Souhaitez-vous un devis personnalise ?",
  "Securite temporelle":
    "Votre securite est notre priorite absolue. Nos capsules temporelles sont equipees de boucliers paradoxaux et chaque voyageur est accompagne d'un guide temporel certifie.",
  "Reserver maintenant":
    "Excellent choix ! Je vous invite a remplir le formulaire de reservation en bas de page, ou je peux vous mettre en contact avec un conseiller voyage temporel.",
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis Chronos, votre assistant temporel. Comment puis-je vous aider ?",
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = (text: string) => {
    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: "user",
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response =
        botResponses[text] ||
        "Merci pour votre message. Un conseiller temporel vous recontactera dans les plus brefs delais. En attendant, n'hesitez pas a explorer nos destinations !"
      const botMsg: Message = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage(input.trim())
  }

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
            <p className="text-xs text-muted-foreground">Assistant temporel</p>
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
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  msg.sender === "user"
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
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="rounded-sm border border-gold/20 px-3 py-1 text-xs text-gold transition-all hover:border-gold/40 hover:bg-gold/10"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Votre question..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            type="submit"
            className="flex h-8 w-8 items-center justify-center rounded-full gold-gradient text-background transition-transform hover:scale-110"
            aria-label="Envoyer"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gold-gradient shadow-lg shadow-gold/20 transition-all duration-300 hover:scale-110 hover:shadow-gold/40 ${
          isOpen ? "rotate-0" : "rotate-0"
        }`}
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
