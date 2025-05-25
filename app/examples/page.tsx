"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, ExternalLink, Globe } from "lucide-react"

export default function ProxyExamples() {
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const testEndpoint = async (key: string, url: string) => {
    setLoading((prev) => ({ ...prev, [key]: true }))
    try {
      const response = await fetch(url)
      const data = await response.text()
      setResponses((prev) => ({ ...prev, [key]: JSON.stringify(JSON.parse(data), null, 2) }))
    } catch (error) {
      setResponses((prev) => ({ ...prev, [key]: `Error: ${error}` }))
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }))
    }
  }

  const examples = [
    {
      key: "external",
      title: "Proxy Externo",
      description: "Redirige a JSONPlaceholder API",
      url: "/api/external/users/1",
      config: `{
  "source": "/api/external/:path*",
  "destination": "https://jsonplaceholder.typicode.com/:path*"
}`,
    },
    {
      key: "cached",
      title: "Proxy con Cache",
      description: "Cache de 60 segundos en el edge",
      url: "/api/cached/get",
      config: `{
  "source": "/api/cached/:path*",
  "destination": "https://httpbin.org/:path*",
  "headers": [{
    "key": "CDN-Cache-Control",
    "value": "max-age=60"
  }]
}`,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Ejemplos de Proxy</h1>
          <p className="text-gray-600">Prueba diferentes configuraciones de proxy</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {examples.map((example) => (
            <Card key={example.key}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {example.title}
                  </CardTitle>
                  <Badge variant="outline">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Activo
                  </Badge>
                </div>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="test" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="test">Probar</TabsTrigger>
                    <TabsTrigger value="config">Configuración</TabsTrigger>
                  </TabsList>

                  <TabsContent value="test" className="space-y-4">
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">{example.url}</code>
                      <Button
                        size="sm"
                        onClick={() => testEndpoint(example.key, example.url)}
                        disabled={loading[example.key]}
                      >
                        {loading[example.key] ? "..." : "Probar"}
                      </Button>
                    </div>

                    {responses[example.key] && (
                      <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto max-h-40">
                        {responses[example.key]}
                      </pre>
                    )}
                  </TabsContent>

                  <TabsContent value="config">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        <span className="text-sm font-medium">vercel.json</span>
                      </div>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">{example.config}</pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Casos de Uso Comunes</CardTitle>
            <CardDescription>Diferentes escenarios donde un proxy es útil</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Badge>API Gateway</Badge>
                <p className="text-sm text-gray-600">Centraliza múltiples APIs bajo un solo dominio</p>
              </div>
              <div className="space-y-2">
                <Badge>CORS Bypass</Badge>
                <p className="text-sm text-gray-600">Evita problemas de CORS en aplicaciones frontend</p>
              </div>
              <div className="space-y-2">
                <Badge>Rate Limiting</Badge>
                <p className="text-sm text-gray-600">Controla el acceso a APIs externas</p>
              </div>
              <div className="space-y-2">
                <Badge>Caching</Badge>
                <p className="text-sm text-gray-600">Mejora el rendimiento con cache en el edge</p>
              </div>
              <div className="space-y-2">
                <Badge>Security</Badge>
                <p className="text-sm text-gray-600">Oculta endpoints reales y añade autenticación</p>
              </div>
              <div className="space-y-2">
                <Badge>Microfrontends</Badge>
                <p className="text-sm text-gray-600">Combina múltiples aplicaciones en un dominio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
