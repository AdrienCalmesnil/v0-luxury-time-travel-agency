"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { MessageCircle, X, Send, Clock } from "lucide-react"

const quickReplies = [
  "Quelles destinations proposez-vous ?",
  "Parlez-moi de Paris 1889",
  "Je veux voir des dinosaures !",
  "Florence et la Renaissance",
]

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Bonjour ! Je suis Chronos, votre assistant temporel. Comment puis-je vous aider a planifier votre prochain voyage dans le temps ?",
          },
        ],
      },
    ],
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, status])

  const handleSend = (text: string) => {
    if (!text.trim() || isLoading) return
    sendMessage({ text: text.trim() })
    setInput("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  const handleQuickReply = (reply: string) => {
    handleSend(reply)
  }

  const showQuickReplies = messages.length <= 2 && !isLoading

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
              {isLoading ? "En train d'ecrire..." : "Assistant temporel"}
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
          {messages.map((msg) => {
            const text = getMessageText(msg)
            if (!text) return null
            return (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "gold-gradient text-background"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {text}
                </div>
              </div>
            )
          })}
          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
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
                onClick={() => handleQuickReply(reply)}
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
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
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
