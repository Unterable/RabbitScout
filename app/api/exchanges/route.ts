import { RABBITMQ_CONFIG } from '../../../lib/config'
import { createApiResponse, createApiErrorResponse, NO_CACHE_HEADERS, NO_CACHE_FETCH_OPTIONS } from '@/lib/api-utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const { host, port, username, password } = RABBITMQ_CONFIG
    const baseUrl = `http://${host}:${port}/api`
    const url = `${baseUrl}/exchanges`

    console.log(`[API Route] Fetching exchanges from ${url}`)
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
        `Failed to fetch exchanges: ${response.statusText}`,
        response.status
      )
    }

    const data = await response.json()
    console.log(`[API Route] Successfully fetched ${data.length} exchanges`)
    return createApiResponse(data)
  } catch (error) {
    console.error('[API Route] Error fetching exchanges:', error)
    return createApiErrorResponse('Failed to fetch exchanges from RabbitMQ')
  }
}
