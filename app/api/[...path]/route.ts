import { RABBITMQ_CONFIG, API_TIMEOUT_MS } from '../../../lib/config'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  try {
    const { host, port, username, password } = RABBITMQ_CONFIG
    const baseUrl = `http://${host}:${port}/api`
    const path = params.path.join('/')
    const url = `${baseUrl}/${path}`

    console.log(`[API Route] Fetching from ${url}`)

    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`

    const response = await fetch(url, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[API Route] Error response from RabbitMQ:`, errorText)
      return NextResponse.json(
        { error: 'Failed to fetch from RabbitMQ', details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log(`[API Route] Successfully fetched ${data.length ?? 1} items`)
    return NextResponse.json(data)
  } catch (error) {
    console.error('[API Route] Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request, { params }: { params: { path: string[] } }) {
  try {
    const { host, port, username, password } = RABBITMQ_CONFIG
    const baseUrl = `http://${host}:${port}/api`
    const path = params.path.join('/')
    const url = `${baseUrl}/${path}`

    console.log(`[API Route] POSTing to ${url}`)

    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
    const body = await request.json()

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[API Route] Error response from RabbitMQ:`, errorText)
      return NextResponse.json(
        { error: 'Failed to post to RabbitMQ', details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('[API Route] Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
