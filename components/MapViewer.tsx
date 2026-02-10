import React, { useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import { GeoPoint, SPECIES_COLORS } from '../types';
import { SPECIES_DESCRIPTION } from '../constants';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../constants';
import OptimizedMapLayer from './OptimizedMapLayer';

const BoundsFitter: React.FC<{ bounds: [[number, number], [number, number]] | null }> = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) map.fitBounds(bounds, { padding: [50, 50] });
  }, [bounds, map]);
  return null;
};

interface MapViewerProps {
  points: GeoPoint[];
  bounds: [[number, number], [number, number]] | null;
}

const MapViewer: React.FC<MapViewerProps> = ({ points, bounds }) => {
  // Generate legend items based on available descriptions
  const legendItems = Object.entries(SPECIES_DESCRIPTION).map(([key, label]) => {
     const typeNum = parseInt(key);
     return {
       id: typeNum,
       label: label,
       color: SPECIES_COLORS[typeNum]
     };
  });

  return (
    <div className="w-full h-full relative bg-slate-900">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        preferCanvas={true}
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={20}
        />
        <OptimizedMapLayer points={points} />
        <BoundsFitter bounds={bounds} />
      </MapContainer>
      
      {/* Expanded Legend Overlay */}
      <div className="absolute bottom-6 right-6 z-[999] bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-lg shadow-2xl text-[10px] leading-tight max-w-[220px] pointer-events-none select-none">
        <h4 className="font-bold text-slate-200 mb-3 text-xs">Legenda (IBGE 2022)</h4>
        <div className="space-y-2">
           {legendItems.map(item => (
             <div key={item.id} className="flex items-start gap-2">
               <span 
                 className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5 shadow-sm" 
                 style={{ backgroundColor: item.color }}
               ></span>
               <span className="text-slate-300">{item.label}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default MapViewer;
