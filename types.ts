export interface RawCsvPoint {
  COD_UF: string;
  COD_MUN: string;
  COD_ESPECIE: string;
  LATITUDE: string;
  LONGITUDE: string;
  NV_GEO_COORD: string;
}

export interface GeoPoint {
  id: number;
  lat: number;
  lng: number;
  type: number; // COD_ESPECIE
  precision: number; // NV_GEO_COORD
}

export interface DatasetStats {
  totalPoints: number;
  speciesDistribution: Record<number, number>;
  bounds: [[number, number], [number, number]] | null;
}

export enum AppState {
  IDLE = 'IDLE',
  PARSING = 'PARSING',
  RENDERING = 'RENDERING',
  READY = 'READY',
  ERROR = 'ERROR'
}

// Color mapping for species (COD_ESPECIE)
export const SPECIES_COLORS: Record<number, string> = {
  1: '#3b82f6', // Domicílio particular (Blue)
  2: '#6366f1', // Domicílio coletivo (Indigo)
  3: '#10b981', // Estabelecimento agropecuário (Emerald)
  4: '#f59e0b', // Estabelecimento de ensino (Amber)
  5: '#ef4444', // Estabelecimento de saúde (Red)
  6: '#8b5cf6', // Outras finalidades (Violet)
  7: '#64748b', // Edificação em construção (Slate)
  8: '#ec4899', // Estabelecimento religioso (Pink)
  0: '#94a3b8'  // Fallback
};
