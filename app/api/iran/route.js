import { feature } from 'topojson-client';
import countries from 'world-atlas/countries-50m.json';

export async function GET(request) {
  // Convert the world countries topology to GeoJSON FeatureCollection
  const countriesFc = feature(countries, countries.objects.countries);

  // Iran ISO numeric code is 364 in world-atlas (Natural Earth)
  const iranFeature = countriesFc.features.find(
    (f) => String(f.id) === '364'
  );

  if (!iranFeature) {
    return new Response(JSON.stringify({ error: 'Iran feature not found' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  // Optionally add minimal properties
  iranFeature.properties = {
    ...(iranFeature.properties || {}),
    name: 'Iran',
    iso_n3: '364',
    iso_a3: 'IRN',
  };

  const { searchParams } = new URL(request.url);
  const download = searchParams.get('download');

  const headers = new Headers({ 'content-type': 'application/geo+json; charset=utf-8' });
  if (download) {
    headers.set('content-disposition', 'attachment; filename="iran.geojson"');
  }

  return new Response(JSON.stringify(iranFeature), { status: 200, headers });
}
