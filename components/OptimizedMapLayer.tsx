import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoPoint, SPECIES_COLORS } from '../types';
import { SPECIES_DESCRIPTION, GEO_CODING_DESCRIPTION } from '../constants';

interface OptimizedMapLayerProps {
  points: GeoPoint[];
}

const OptimizedMapLayer: React.FC<OptimizedMapLayerProps> = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || points.length === 0) return;

    const canvasRenderer = L.canvas({ padding: 0.5 });
    
    const markers: L.CircleMarker[] = [];
    const layerGroup = L.layerGroup().addTo(map);

    console.time("RenderMarkers");
    
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      
      const color = SPECIES_COLORS[p.type] || SPECIES_COLORS[0];
      const speciesName = SPECIES_DESCRIPTION[p.type] || `Tipo ${p.type}`;
      const geoDesc = GEO_CODING_DESCRIPTION[p.precision] || `Nível ${p.precision}`;
      
      const marker = L.circleMarker([p.lat, p.lng], {
        renderer: canvasRenderer,
        radius: 1, 
        fillColor: color,
        color: undefined, 
        weight: 0,
        opacity: 1,
        fillOpacity: 0.9, 
      });

      marker.bindTooltip(
        `<div class="font-sans text-xs">
           <strong style="color:${color}">● ${speciesName}</strong><br/>
           <span class="text-gray-500">${geoDesc}</span><br/>
           <span class="opacity-70">Lat: ${p.lat.toFixed(5)}, Lng: ${p.lng.toFixed(5)}</span>
         </div>`, 
        {
          direction: 'top',
          offset: [0, -5],
          opacity: 0.95,
          className: 'custom-leaflet-tooltip' // We rely on Tailwind resets mostly, but this allows custom css if needed
        }
      );

      markers.push(marker);
    }

    markers.forEach(m => m.addTo(layerGroup));
    
    console.timeEnd("RenderMarkers");

    return () => {
      layerGroup.remove();
    };
  }, [map, points]);

  return null;
};

export default OptimizedMapLayer;
