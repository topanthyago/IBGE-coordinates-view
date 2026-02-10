export const DEFAULT_CENTER: [number, number] = [-24.726470, -53.741605]; // Toledo, PR generic center
export const DEFAULT_ZOOM = 13;

export const IBGE_DOWNLOAD_URL = "https://www.ibge.gov.br/estatisticas/downloads-estatisticas.html?caminho=Cadastro_Nacional_de_Enderecos_para_Fins_Estatisticos/Censo_Demografico_2022/Coordenadas_enderecos/Municipio";

export const SPECIES_DESCRIPTION: Record<number, string> = {
  1: "Domicílio particular",
  2: "Domicílio coletivo",
  3: "Estabelecimento agropecuário",
  4: "Estabelecimento de ensino",
  5: "Estabelecimento de saúde",
  6: "Estabelecimento de outras finalidades",
  7: "Edificação em construção",
  8: "Estabelecimento religioso"
};

export const GEO_CODING_DESCRIPTION: Record<number, string> = {
  1: "Coordenada original do Censo 2022",
  2: "Coordenada modificada (apartamentos)",
  3: "Coordenada estimada",
  4: "Face de quadra",
  5: "Localidade",
  6: "Setor censitário"
};

export const SAMPLE_CSV = `COD_UF;COD_MUN;COD_ESPECIE;LATITUDE;LONGITUDE;NV_GEO_COORD
41;4127700;6;-24.726470;-53.741605;1
41;4127700;6;-24.726572;-53.741570;1
41;4127700;1;-24.726443;-53.741241;1
41;4127700;6;-24.726373;-53.740259;1
41;4127700;1;-24.726455;-53.741044;2
41;4127700;6;-24.726526;-53.740837;1
41;4127700;1;-24.726637;-53.740882;1
41;4127700;5;-24.726826;-53.740801;1
41;4127700;1;-24.726863;-53.740903;2`;
