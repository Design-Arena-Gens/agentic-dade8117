import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./ui/MapView'), { ssr: false });

export default function Page() {
  return <MapView />;
}
