"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

type ChatMessage = {
  id: number
  sender: "user" | "bot"
  text: string
}

const conversationTree = {
  start: {
    botMessage: "¡Hola! Soy Melania, tu asistente inmobiliaria. ¿Cómo puedo ayudarte hoy?",
    options: [
      { text: "¿Qué propiedades tienen?", next: "ask_type" },
      { text: "Quiero agendar una visita", next: "ask_visit_generic" },
      { text: "¿Aceptan permutas?", next: "ask_swap" },
    ],
  },
  ask_type: {
    botMessage:
      "¡Claro! Tenemos departamentos de 2 y 3 ambientes en el centro y chalets en la zona sur. ¿Qué tipo de propiedad te interesa más?",
    options: [
      { text: "Departamentos", next: "show_apartments" },
      { text: "Chalets", next: "show_chalets" },
    ],
  },
  show_apartments: {
    botMessage:
      "Excelente elección. Los departamentos en el centro son muy luminosos y modernos. ¿Te gustaría ver fotos o agendar una visita?",
    options: [
      { text: "Ver fotos", next: "show_photos_apartments" },
      { text: "Agendar visita", next: "ask_visit_apartments" },
      { text: "Volver", next: "ask_type" },
    ],
  },
  show_chalets: {
    botMessage:
      "Perfecto. Los chalets en la zona sur cuentan con amplios jardines y mucha tranquilidad. ¿Prefieres ver fotos o agendar una visita?",
    options: [
      { text: "Ver fotos", next: "show_photos_chalets" },
      { text: "Agendar visita", next: "ask_visit_chalets" },
      { text: "Volver", next: "ask_type" },
    ],
  },
  show_photos_apartments: {
    botMessage:
      "Aquí tienes un enlace a nuestra galería de fotos de los departamentos: [link a la galería]. Cuando quieras, podemos agendar una visita.",
    options: [
      { text: "Agendar visita", next: "ask_visit_apartments" },
      { text: "Tengo otra consulta", next: "start_over" },
    ],
  },
  show_photos_chalets: {
    botMessage:
      "Te comparto el enlace a la galería de fotos de los chalets: [link a la galería]. ¡Avísame si quieres coordinar una visita!",
    options: [
      { text: "Agendar visita", next: "ask_visit_chalets" },
      { text: "Tengo otra consulta", next: "start_over" },
    ],
  },
  ask_visit_generic: {
    botMessage:
      "¡Por supuesto! Para agendar una visita, primero dime qué tipo de propiedad te interesa: ¿departamento o chalet?",
    options: [
      { text: "Departamento", next: "ask_visit_apartments" },
      { text: "Chalet", next: "ask_visit_chalets" },
    ],
  },
  ask_visit_apartments: {
    botMessage:
      "Genial. Para agendar una visita a un departamento, déjame tu nombre y un teléfono y un asesor se comunicará contigo en menos de 24hs para coordinar.",
    options: [{ text: "¡Gracias!", next: "end_thank_you" }],
  },
  ask_visit_chalets: {
    botMessage:
      "Perfecto. Para coordinar una visita a un chalet, por favor, déjame tu nombre y un teléfono. Un asesor te contactará a la brevedad.",
    options: [{ text: "¡Gracias!", next: "end_thank_you" }],
  },
  ask_swap: {
    botMessage:
      "En algunos casos sí aceptamos permutas. Para analizarlo, te pido que me envíes los detalles de tu propiedad (ubicación, m², estado) y lo evaluaremos. ¿Quieres que te contacte un asesor?",
    options: [
      { text: "Sí, por favor", next: "end_contact_assessor" },
      { text: "No, gracias", next: "end_thank_you" },
    ],
  },
  end_contact_assessor: {
    botMessage:
      "¡Excelente! Un asesor especializado en permutas se pondrá en contacto contigo. Gracias por tu consulta.",
    options: [{ text: "Empezar de nuevo", next: "start_over" }],
  },
  end_thank_you: {
    botMessage: "¡Gracias a ti por tu interés! Estoy aquí si necesitas algo más.",
    options: [{ text: "Empezar de nuevo", next: "start_over" }],
  },
  start_over: {
    botMessage: "¿En qué más puedo ayudarte?",
    options: [
      { text: "¿Qué propiedades tienen?", next: "ask_type" },
      { text: "Quiero agendar una visita", next: "ask_visit_generic" },
      { text: "¿Aceptan permutas?", next: "ask_swap" },
    ],
  },
}

const initialBotMessageText = conversationTree.start.botMessage
const LOCAL_STORAGE_KEY = "melaniaDemoState"

type DemoState = {
  messages: ChatMessage[]
  currentNodeId: string
}

export default function MelaniaDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentNodeId, setCurrentNodeId] = useState("start")
  const [isTyping, setIsTyping] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false) // Para evitar renderizar antes de cargar de localStorage
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Cargar estado desde localStorage al montar el componente
  useEffect(() => {
    try {
      const savedStateRaw = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedStateRaw) {
        const savedState: DemoState = JSON.parse(savedStateRaw)
        // Validar que el nodo guardado exista en el árbol actual
        if (conversationTree[savedState.currentNodeId as keyof typeof conversationTree]) {
          setMessages(savedState.messages)
          setCurrentNodeId(savedState.currentNodeId)
        } else {
          // Si el nodo no existe (ej. el árbol cambió), reiniciar
          setMessages([{ id: 1, sender: "bot", text: initialBotMessageText }])
          setCurrentNodeId("start")
        }
      } else {
        // No hay estado guardado, usar el inicial
        setMessages([{ id: 1, sender: "bot", text: initialBotMessageText }])
        setCurrentNodeId("start")
      }
    } catch (error) {
      console.error("Error loading state from localStorage:", error)
      // En caso de error, usar el estado inicial
      setMessages([{ id: 1, sender: "bot", text: initialBotMessageText }])
      setCurrentNodeId("start")
    }
    setIsInitialized(true) // Marcar como inicializado
  }, [])

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    if (isInitialized) {
      // Solo guardar si ya se inicializó desde localStorage
      try {
        const stateToSave: DemoState = { messages, currentNodeId }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave))
      } catch (error) {
        console.error("Error saving state to localStorage:", error)
      }
    }
  }, [messages, currentNodeId, isInitialized])

  // Scroll al último mensaje
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleOptionClick = (option: { text: string; next: string }) => {
    const userMessage: ChatMessage = { id: Date.now(), sender: "user", text: option.text }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const nextNodeKey = option.next as keyof typeof conversationTree
      const nextNode = conversationTree[nextNodeKey]

      if (nextNode) {
        const botMessage: ChatMessage = { id: Date.now() + 1, sender: "bot", text: nextNode.botMessage }
        setMessages((prev) => [...prev, botMessage])
        setCurrentNodeId(option.next)
      } else {
        // Manejar caso donde el nodo 'next' no se encuentra (debería ser raro si el árbol está bien definido)
        console.error(`Nodo no encontrado: ${option.next}`)
        const errorMessage: ChatMessage = {
          id: Date.now() + 1,
          sender: "bot",
          text: "Lo siento, hubo un error. Intentemos de nuevo.",
        }
        setMessages((prev) => [...prev, errorMessage])
        setCurrentNodeId("start") // Volver al inicio
      }
      setIsTyping(false)
    }, 1200)
  }

  const handleReset = () => {
    const initialMsg: ChatMessage = { id: Date.now(), sender: "bot", text: initialBotMessageText }
    setMessages([initialMsg])
    setCurrentNodeId("start")
    // Opcionalmente, también limpiar localStorage al resetear explícitamente
    // localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  if (!isInitialized) {
    // Mostrar un loader o nada mientras se carga desde localStorage para evitar FOUC
    return (
      <div className="border rounded-lg p-4 flex flex-col h-[450px] bg-background items-center justify-center">
        <p className="text-muted-foreground">Cargando demo...</p>
      </div>
    )
  }

  const currentNode = conversationTree[currentNodeId as keyof typeof conversationTree]
  // Asegurarse de que currentNode exista antes de intentar acceder a sus propiedades
  if (!currentNode) {
    console.error(`Estado inválido: currentNodeId "${currentNodeId}" no existe en conversationTree. Reiniciando.`)
    handleReset() // Llama a reset para corregir el estado
    return (
      // Muestra un mensaje de error o loader mientras se resetea
      <div className="border rounded-lg p-4 flex flex-col h-[450px] bg-background items-center justify-center">
        <p className="text-destructive">Error en la demo. Reiniciando...</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 flex flex-col h-[450px] bg-background">
      <div className="flex justify-between items-center mb-2 pb-2 border-b">
        <h4 className="font-semibold text-sm">Demo Interactiva: Melania Bot</h4>
        <Button variant="ghost" size="sm" onClick={handleReset} title="Reiniciar conversación">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      <div ref={scrollAreaRef} className="flex-grow overflow-y-auto pr-2 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex items-end gap-2", msg.sender === "user" ? "justify-end" : "justify-start")}
          >
            {msg.sender === "bot" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <Bot />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "rounded-lg px-3 py-2 max-w-[80%]",
                msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
            {msg.sender === "user" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-end gap-2 justify-start">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                <Bot />
              </AvatarFallback>
            </Avatar>
            <div className="rounded-lg px-3 py-2 bg-muted">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="grid grid-cols-1 gap-2">
          {currentNode.options.map((option) => (
            <Button
              key={option.text}
              variant="outline"
              size="sm"
              onClick={() => handleOptionClick(option)}
              disabled={isTyping}
            >
              {option.text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
