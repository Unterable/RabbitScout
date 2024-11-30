import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { NO_CACHE_HEADERS } from '@/lib/api-utils'

export async function GET(request: Request) {
  const headersList = headers()
  const upgrade = headersList.get("upgrade")

  if (!upgrade || upgrade !== "websocket") {
    return new NextResponse("Expected Upgrade: websocket", { status: 426 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    // Validate token here if needed
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Return response to upgrade the connection
    return new NextResponse(null, {
      status: 101,
      headers: {
        Upgrade: "websocket",
        Connection: "Upgrade",
        "Sec-WebSocket-Accept": token,
        ...NO_CACHE_HEADERS
      },
    })
  } catch (error) {
    console.error("WebSocket upgrade error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
