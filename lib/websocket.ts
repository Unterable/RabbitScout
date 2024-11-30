import { RABBITMQ_CONFIG } from "@/lib/utils"

type MessageHandler = (data: any) => void

class RabbitMQWebSocket {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private handlers: Set<MessageHandler> = new Set()

  constructor() {
    if (typeof window !== "undefined") {
      this.connect()
    }
  }

  private connect() {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    const credentials = btoa(
      `${RABBITMQ_CONFIG.username}:${RABBITMQ_CONFIG.password}`
    )

    this.ws = new WebSocket(
      `${protocol}//${RABBITMQ_CONFIG.host}:${RABBITMQ_CONFIG.port}/ws`
    )

    this.ws.onopen = () => {
      console.log("WebSocket connected")
      this.reconnectAttempts = 0
      this.ws?.send(
        JSON.stringify({
          type: "auth",
          credentials,
        })
      )
    }

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        this.handlers.forEach((handler) => handler(data))
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error)
      }
    }

    this.ws.onclose = () => {
      console.log("WebSocket disconnected")
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++
          this.connect()
        }, this.reconnectDelay * Math.pow(2, this.reconnectAttempts))
      }
    }

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error)
    }
  }

  subscribe(handler: MessageHandler) {
    this.handlers.add(handler)
    return () => this.handlers.delete(handler)
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }
}

export const rabbitMQWebSocket = new RabbitMQWebSocket()
