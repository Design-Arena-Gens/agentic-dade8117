export const metadata = {
  title: 'Iran GeoJSON Map',
  description: 'Exact Iran GeoJSON served from world-atlas/topojson',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
