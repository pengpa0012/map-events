import React, { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { Button } from '@mantine/core'
import { LatLng, LatLngTuple } from 'leaflet'
import { useRouter } from 'next/router'
import { useLocalStorage } from '@mantine/hooks'

export default function map({ report }: { report?: Boolean }) {
  const position = [14.599, 120.98] as LatLngTuple
  const router = useRouter()

  const LocationMarker = () => {
    const [markerPosition, setMarkerPosition] = useLocalStorage<LatLng>({
      key: 'position',
    })
    const map = useMapEvents({
      click(e) {
        map.setView(e.latlng)
        setMarkerPosition(e.latlng)
      },
    })
    if (markerPosition?.lat == null) return
    return <Marker position={[markerPosition.lat, markerPosition.lng]}></Marker>
  }

  return (
    <MapContainer
      center={position}
      zoom={20}
      scrollWheelZoom={false}
      className={`w-full ${report ? 'h-[500px]' : 'min-h-screen'}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {report ? (
        <LocationMarker />
      ) : (
        <Marker position={position}>
          <Popup>
            <p className="text-md">A cute dog in a park</p>
            <img
              src="https://via.placeholder.com/100x100"
              className="w-full my-2"
            />
            <Button
              variant="filled"
              onClick={() => router.push('/map/321')}
              className="w-full"
            >
              Open
            </Button>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
