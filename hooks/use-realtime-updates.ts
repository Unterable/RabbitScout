import { useEffect, useState } from "react"

export type UpdateType = "queue" | "exchange" | "connection" | "channel"

export function useRealtimeUpdates<T>(
  type: UpdateType,
  initialData: T[],
  updateHandler?: (current: T[], update: any) => T[]
): T[] {
  const [data, setData] = useState<T[]>(initialData)

  // Only update data if initialData reference changes
  useEffect(() => {
    setData(initialData)
  }, [initialData])

  // WebSocket functionality temporarily disabled
  /*useEffect(() => {
    const socket = new WebSocket(`ws://${RABBITMQ_CONFIG.host}:15674/ws`)
    
    socket.onopen = () => {
      console.log(`[Realtime] WebSocket connected for ${type}`);
      socket.send(JSON.stringify({ command: 'subscribe', type }))
    }

    socket.onmessage = (event) => {
      const update = JSON.parse(event.data)
      console.log(`[Realtime] Received ${type} update:`, update);
      setData(current => updateHandler!(current, update))
    }

    socket.onerror = (error) => {
      console.error(`[Realtime] WebSocket error for ${type}:`, error)
    }

    socket.onclose = () => {
      console.log(`[Realtime] WebSocket closed for ${type}`)
    }

    return () => {
      socket.close()
    }
  }, [type, updateHandler])*/

  return data
}

// Example usage:
// const queues = useRealtimeUpdates('queue', initialQueues, (current, update) => {
//   return current.map(queue => 
//     queue.name === update.name ? { ...queue, ...update } : queue
//   )
// })
