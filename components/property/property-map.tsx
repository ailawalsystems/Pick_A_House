"use client"

import { useEffect, useRef, useState } from "react"

interface PropertyMapProps {
  coordinates: {
    lat: number
    lng: number
  }
}

export function PropertyMap({ coordinates }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // In a real application, you would integrate with a map provider like Google Maps or Mapbox
    // For this demo, we'll just show a placeholder
    if (mapRef.current) {
      setMapLoaded(true)
    }
  }, [coordinates])

  return (
    <div ref={mapRef} className="h-[400px] w-full rounded-lg border bg-muted/40">
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">Map Location</p>
          <p className="text-sm text-muted-foreground">
            Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">(In a real app, this would display an interactive map)</p>
        </div>
      </div>
    </div>
  )
}
