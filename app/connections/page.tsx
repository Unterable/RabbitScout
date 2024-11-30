import { Suspense } from "react"
import { ConnectionList } from "@/components/connections/connection-list"
import { ConnectionListSkeleton } from "@/components/connections/connection-list-skeleton"
import { ApiError } from "@/components/common/api-error"
import { getRabbitMQAuthHeaders, getRabbitMQBaseUrl } from "@/lib/config"
import { handleRabbitMQError } from "@/lib/utils"

export const dynamic = "force-dynamic"
export const revalidate = 0

async function ConnectionsPage() {
  try {
    const baseUrl = getRabbitMQBaseUrl()
    const url = `${baseUrl}/api/connections`
    
    const response = await fetch(url, {
      headers: getRabbitMQAuthHeaders(),
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`RabbitMQ API error: ${response.statusText}`)
    }

    const connections = await response.json()

    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Connections</h2>
            <p className="text-muted-foreground">
              Monitor and manage RabbitMQ connections
            </p>
          </div>
        </div>
        <ConnectionList connections={connections} />
      </div>
    )
  } catch (error: unknown) {
    const handledError = handleRabbitMQError(error)
    console.error("[ConnectionsPage] Error:", handledError)
    return <ApiError error={handledError} />
  }
}

export default function Page() {
  return (
    <Suspense fallback={<ConnectionListSkeleton />}>
      <ConnectionsPage />
    </Suspense>
  )
}
