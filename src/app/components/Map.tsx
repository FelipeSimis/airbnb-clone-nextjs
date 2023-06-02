'use client';

import Leaflet from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerIconShadow.src,
});

type MapProps = {
  center?: [number, number];
};

const UpdateMapView = ({ center }: MapProps) => {
  const map = useMap();

  if (center !== undefined) {
    map.setView(center);
  }

  return null;
};

const Map = ({ center }: MapProps) => (
  <MapContainer
    center={(center as Leaflet.LatLngExpression) || [51, -0.09]}
    zoom={center ? 4 : 2}
    scrollWheelZoom={false}
    className="h-[35vh] w-full rounded-lg"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {center && <Marker position={center} />}

    <UpdateMapView center={center} />
  </MapContainer>
);

export default Map;
