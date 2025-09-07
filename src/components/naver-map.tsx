'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    naver: any
  }
}

interface NaverMapProps {
  width?: string
  height?: string
  center?: {
    lat: number
    lng: number
  }
  zoom?: number
  className?: string
}

export default function NaverMap({
  width = '100%',
  height = '400px',
  center = { lat: 37.5665, lng: 126.978 }, // 서울시청 기본값
  zoom = 15,
  className = '',
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)

  useEffect(() => {
    const initializeMap = () => {
      if (!window.naver || !mapRef.current) return

      const mapOptions = {
        center: new window.naver.maps.LatLng(center.lat, center.lng),
        zoom: zoom,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.naver.maps.MapTypeControlStyle.BUTTON,
          position: window.naver.maps.Position.TOP_RIGHT,
        },
        zoomControl: true,
        zoomControlOptions: {
          style: window.naver.maps.ZoomControlStyle.SMALL,
          position: window.naver.maps.Position.RIGHT_CENTER,
        },
      }

      mapInstance.current = new window.naver.maps.Map(
        mapRef.current,
        mapOptions,
      )
    }

    if (window.naver && window.naver.maps) {
      initializeMap()
    } else {
      const script = document.createElement('script')
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`
      script.onload = initializeMap
      document.head.appendChild(script)

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }
  }, [center.lat, center.lng, zoom])

  return (
    <div
      ref={mapRef}
      style={{ width, height }}
      className={`rounded-lg border ${className}`}
    />
  )
}
