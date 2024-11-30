import { RABBITMQ_CONFIG } from '@/lib/utils'
import { createApiResponse, createApiErrorResponse, NO_CACHE_HEADERS, NO_CACHE_FETCH_OPTIONS } from '@/lib/api-utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  request: Request,
  { params }: { params: { vhost: string; exchange: string } }
) {
  try {
    const { host, port, username, password } = RABBITMQ_CONFIG
    const { vhost, exchange } = params
    const baseUrl = `http://${host}:${port}/api`
    const url = `${baseUrl}/exchanges/${encodeURIComponent(vhost)}/${encodeURIComponent(exchange)}/bindings/source`

    console.log(`[API Route] Fetching bindings for exchange ${exchange} in vhost ${vhost}`)
    console.log(`[API Route] Using host: ${host}:${port}`)

    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`

    const response = await fetch(url, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        ...NO_CACHE_HEADERS
      },
      ...NO_CACHE_FETCH_OPTIONS,
      signal: AbortSignal.timeout(5000)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[API Route] RabbitMQ API error:`, {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      })
      return createApiErrorResponse(
        `Failed to fetch exchange bindings: ${response.statusText}`,
        response.status
      )
    }

    const data = await response.json()
    console.log(`[API Route] Successfully fetched ${data.length} bindings for exchange ${exchange}`)
    return createApiResponse(data)
  } catch (error) {
    console.error('[API Route] Error fetching exchange bindings:', error)
    return createApiErrorResponse('Failed to fetch exchange bindings from RabbitMQ')
  }
}
