import React, { useEffect } from 'react'
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

export default function Map({
  report,
  locations,
}: {
  report?: Boolean
  locations?: any
}) {
  const position = [14.599, 120.98] as LatLngTuple
  const router = useRouter()
  const [markerPosition, setMarkerPosition] = useLocalStorage<LatLng>({
    key: 'position',
  })

  useEffect(() => {
    setMarkerPosition({} as LatLng)
  }, [])

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        map.setView(e.latlng)
        setMarkerPosition(e.latlng)
      },
    })
    if (markerPosition?.lat == null) return
    return <Marker position={[markerPosition.lat, markerPosition.lng]}></Marker>
  }
  console.log(locations)
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
        locations?.map((el: any) => (
          <Marker position={[el.location.lat, el.location.lng]} key={el._id}>
            <Popup>
              <p className="text-md">{el.title}</p>
              <img
                src={el.images[0] || 'https://via.placeholder.com/150x150'}
                className="w-full my-2"
              />
              <Button
                variant="filled"
                onClick={() => router.push(`/map/${el._id}`)}
                className="w-full"
              >
                Open
              </Button>
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  )
}
