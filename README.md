# Iran GeoJSON (Next.js + Leaflet)

- `/api/iran` serves an exact Iran GeoJSON derived from world-atlas (Natural Earth 1:50m) via TopoJSON conversion.
- `/` visualizes the GeoJSON on an interactive Leaflet map and provides a download link.

## Local development

```bash
npm install
npm run build
npm start
```

## Deploy

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-dade8117
```
