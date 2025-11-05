'use client';
import { useEffect, useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

export default function MapView() {
  const [iran, setIran] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/iran')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch Iran GeoJSON');
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setIran(data);
      })
      .catch((e) => !cancelled && setError(e.message));
    return () => { cancelled = true; };
  }, []);

  const center = useMemo(() => [32.0, 53.0], []);

  return (
    <div className="main">
      <header className="header">
        <div className="title">Iran GeoJSON (Exact, world-atlas 1:50m)</div>
        <div className="actions">
          <a className="btn" href="/api/iran?download=1">Download GeoJSON</a>
          <a className="btn secondary" href="/api/iran" target="_blank" rel="noreferrer">Open API</a>
        </div>
      </header>
      <div className="map">
        <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {iran && (
            <GeoJSON
              key="iran"
              data={iran}
              style={{ color: '#ef4444', weight: 2, fillOpacity: 0.1 }}
            />
          )}
        </MapContainer>
      </div>
      <footer className="footer">
        Data source: world-atlas (Natural Earth 1:50m). Projection and rendering via Leaflet.
      </footer>
    </div>
  );
}
