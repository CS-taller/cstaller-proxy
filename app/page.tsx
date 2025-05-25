"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Globe, ShoppingBag, CheckCircle } from "lucide-react"

export default function ProxyStatus() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">C.Staller Proxy</h1>
          <p className="text-gray-600">Proxy intermedio para integración Shopify</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Configuración Principal
              </CardTitle>
              <CardDescription>Estado actual del proxy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dominio Principal</span>
                <Badge variant="outline">www.cstaller.com</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Framer Site</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Activo
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Proxy Shopify</span>
                <Badge className="bg-blue-100 text-blue-800">
                  <ShoppingBag className="h-3 w-3 mr-1" />
                  /shop/*
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-green-500" />
                Tienda Shopify
              </CardTitle>
              <CardDescription>Configuración de la tienda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Shopify Store</span>
                <Badge variant="outline">cstaller.myshopify.com</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Ruta Proxy</span>
                <Badge className="bg-purple-100 text-purple-800">/shop/:path*</Badge>
              </div>
              <Button className="w-full" asChild>
                <a href="/shop" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visitar Tienda
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configuración DNS en Hostinger</CardTitle>
            <CardDescription>Pasos para configurar tu dominio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">1. Configurar CNAME en Hostinger:</h4>
              <div className="bg-white p-3 rounded border font-mono text-sm">
                <div>Tipo: CNAME</div>
                <div>Nombre: www</div>
                <div>Valor: cname.vercel-dns.com</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">2. En Vercel Dashboard:</h4>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Añadir dominio: www.cstaller.com</li>
                <li>• Configurar como alias del proyecto</li>
                <li>• Verificar SSL automático</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">Resultado:</h4>
              <ul className="text-sm space-y-1 ml-4 text-blue-700">
                <li>• www.cstaller.com → Framer (principal)</li>
                <li>• www.cstaller.com/shop → Shopify (proxy)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>URLs de Prueba</CardTitle>
            <CardDescription>Verifica que el proxy funcione correctamente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <code className="text-sm">www.cstaller.com/shop</code>
                <Badge>Página principal tienda</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <code className="text-sm">www.cstaller.com/shop/collections</code>
                <Badge>Colecciones</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <code className="text-sm">www.cstaller.com/shop/products</code>
                <Badge>Productos</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <code className="text-sm">www.cstaller.com/shop/cart</code>
                <Badge>Carrito</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
