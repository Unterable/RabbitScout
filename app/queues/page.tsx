import { Suspense } from "react"
import { QueueList } from "@/components/queues/queue-list"
import { QueueListSkeleton } from "@/components/queues/queue-list-skeleton"
import { ApiError } from "@/components/common/api-error"
import { getRabbitMQAuthHeaders, getRabbitMQBaseUrl, API_TIMEOUT_MS } from "@/lib/config"

export const dynamic = "force-dynamic"
export const revalidate = 0

async function QueuesPage() {
  try {
    const baseUrl = getRabbitMQBaseUrl()
    const url = `${baseUrl}/api/queues`
    
    const response = await fetch(url, {
      headers: getRabbitMQAuthHeaders(),
      cache: 'no-store',
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    })

    if (!response.ok) {
      throw new Error(`RabbitMQ API error: ${response.statusText}`)
    }

    const queues = await response.json()

    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Queues</h2>
            <p className="text-muted-foreground">
              Manage and monitor your RabbitMQ queues
            </p>
          </div>
        </div>
        <QueueList queues={queues} />
      </div>
    )
  } catch (error: any) {
    console.error("[QueuesPage] Error:", error)
    return <ApiError error={error} />
  }
}

export default function Page() {
  return (
    <Suspense fallback={<QueueListSkeleton />}>
      <QueuesPage />
    </Suspense>
  )
}
