import { NextResponse } from 'next/server'

// Common cache prevention headers
export const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
}

// Common fetch options to prevent caching
export const NO_CACHE_FETCH_OPTIONS = {
  cache: 'no-store' as RequestCache
}

// Helper function to create a response with no-cache headers
export function createApiResponse(data: any, options: { status?: number } = {}) {
  return NextResponse.json(data, {
    status: options.status || 200,
    headers: NO_CACHE_HEADERS
  })
}

// Helper function to create an error response with no-cache headers
export function createApiErrorResponse(error: string, status: number = 500) {
  return NextResponse.json(
    { error },
    { 
      status,
      headers: NO_CACHE_HEADERS
    }
  )
}
