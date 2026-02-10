import Papa from 'papaparse';
import { GeoPoint, RawCsvPoint, DatasetStats } from '../types';

export const parseCSV = (csvText: string): Promise<{ points: GeoPoint[]; stats: DatasetStats }> => {
  return new Promise((resolve, reject) => {
    Papa.parse<RawCsvPoint>(csvText, {
      header: true,
      delimiter: ";", // The specific delimiter for IBGE files
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0 && results.data.length === 0) {
          reject(new Error("Erro ao ler CSV. Verifique o formato."));
          return;
        }

        const points: GeoPoint[] = [];
        const speciesDist: Record<number, number> = {};
        let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;

        results.data.forEach((row, index) => {
          // Parse coordinates (handle potential comma/dot issues if they arise, though sample uses dots)
          const lat = parseFloat(row.LATITUDE);
          const lng = parseFloat(row.LONGITUDE);
          const type = parseInt(row.COD_ESPECIE, 10) || 0;
          const precision = parseInt(row.NV_GEO_COORD, 10) || 0;

          if (!isNaN(lat) && !isNaN(lng)) {
            points.push({
              id: index,
              lat,
              lng,
              type,
              precision
            });

            // Update Bounds
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
            if (lng < minLng) minLng = lng;
            if (lng > maxLng) maxLng = lng;

            // Update Stats
            speciesDist[type] = (speciesDist[type] || 0) + 1;
          }
        });

        const bounds: [[number, number], [number, number]] | null = points.length > 0 
          ? [[minLat, minLng], [maxLat, maxLng]] 
          : null;

        resolve({
          points,
          stats: {
            totalPoints: points.length,
            speciesDistribution: speciesDist,
            bounds
          }
        });
      },
      error: (err) => {
        reject(err);
      }
    });
  });
};
