'use client';

import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';

delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

type Props = {
  onPick: (lat: number, lon: number) => void;
};

const MapPicker = ({ onPick }: Props) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        onPick(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <div className="h-96 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700">
      <MapContainer center={[55.75, 37.6]} zoom={6} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler/>
        {position && <Marker position={position}/>}
      </MapContainer>
    </div>
  );
};

export default MapPicker;
