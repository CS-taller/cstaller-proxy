"use client"

import { useEffect } from "react"

export default function ShopRedirect() {
  useEffect(() => {
    // Redirigir a la tienda principal si alguien accede directamente a /shop
    window.location.href = "/shop/collections/all"
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="text-gray-600">Redirigiendo a la tienda...</p>
      </div>
    </div>
  )
}
