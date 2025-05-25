import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { targetUrl, path } = await request.json()

    if (!targetUrl) {
      return NextResponse.json({ error: "Target URL is required" }, { status: 400 })
    }

    // Construir la URL completa
    const fullUrl = path ? `${targetUrl}/${path}` : targetUrl

    // Realizar la petición al destino
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Vercel-Proxy/1.0",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.text()

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json(
      { error: "Failed to proxy request", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const target = searchParams.get("target")

  if (!target) {
    return NextResponse.json({ error: "Target parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(target, {
      method: "GET",
      headers: {
        "User-Agent": "Vercel-Proxy/1.0",
      },
    })

    const data = await response.text()

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to proxy request" }, { status: 500 })
  }
}
