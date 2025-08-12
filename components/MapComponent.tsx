// app/components/MapComponent.tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Listing } from '@/lib/listing-data';

// Function to create custom numbered icons using a string with Tailwind classes
const createNumberedIcon = (number: number) => {
  return L.divIcon({
    html: `<div class="relative flex items-center justify-center w-8 h-8 bg-red-500 text-white font-bold rounded-full shadow-lg border-2 border-white">${number}</div>`,
    className: 'bg-transparent border-0', // This class on the wrapper is important
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export default function MapComponent({ listings }: { listings: Listing[] }) {
  const position: [number, number] = [40.7128, -74.006]; // Default to NYC

  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={false}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((listing, index) => (
        <Marker
          key={listing.id}
          position={[listing.lat, listing.lng]}
          icon={createNumberedIcon(index + 1)}
        >
          <Popup>
            <div className="font-bold">{listing.title}</div>
            <div className="text-sm">{listing.location}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
