import React, { useState } from 'react';
import { AppState, DatasetStats, SPECIES_COLORS } from '../types';
import { SPECIES_DESCRIPTION, SAMPLE_CSV } from '../constants';
import { Map, Upload, FileText, BarChart3, AlertCircle, Info, Download } from 'lucide-react';

interface SidebarProps {
  appState: AppState;
  stats: DatasetStats | null;
  onProcessData: (csv: string) => void;
  onOpenInfo: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ appState, stats, onProcessData, onOpenInfo }) => {
  const [csvInput, setCsvInput] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handlePasteSample = () => {
    setCsvInput(SAMPLE_CSV);
  };

  const handleSubmit = () => {
    if (!csvInput.trim()) return;
    onProcessData(csvInput);
  };

  return (
    <div 
      className={`fixed top-0 left-0 z-[1000] h-full bg-slate-900/95 backdrop-blur-md border-r border-slate-700 shadow-2xl transition-all duration-300 flex flex-col ${isExpanded ? 'w-96' : 'w-16'}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {isExpanded && (
          <div className="flex items-center space-x-2 text-blue-400">
            <Map className="w-6 h-6" />
            <h1 className="font-bold text-xl tracking-tight text-white">GeoToledo</h1>
          </div>
        )}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
        >
          {isExpanded ? '<' : '>'}
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
             <button 
               onClick={onOpenInfo}
               className="flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 transition-colors"
             >
               <Info className="w-4 h-4 text-blue-400" />
               Sobre os Dados
             </button>
             <button 
               onClick={onOpenInfo}
               className="flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 transition-colors"
             >
               <Download className="w-4 h-4 text-emerald-400" />
               Baixar CSV
             </button>
          </div>

          {/* Status Indicator */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${
                appState === AppState.READY ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                appState === AppState.PARSING || appState === AppState.RENDERING ? 'bg-amber-400 animate-pulse' :
                appState === AppState.ERROR ? 'bg-red-500' :
                'bg-slate-500'
              }`} />
              <span className="font-medium text-slate-200">
                {appState === AppState.IDLE && "Aguardando Dados"}
                {appState === AppState.PARSING && "Processando CSV..."}
                {appState === AppState.RENDERING && "Renderizando Pontos..."}
                {appState === AppState.READY && "Visualização Ativa"}
                {appState === AppState.ERROR && "Erro no Processamento"}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Cole o CSV contendo coordenadas de Toledo/PR para visualizar.
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Input de Dados
              </label>
              <button 
                onClick={handlePasteSample}
                className="text-xs text-blue-400 hover:text-blue-300 underline"
              >
                Usar Exemplo
              </button>
            </div>
            <textarea
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="Cole seu CSV aqui (COD_UF;COD_MUN;LATITUDE...)"
              className="w-full h-48 bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none custom-scrollbar"
              spellCheck={false}
            />
            <button
              onClick={handleSubmit}
              disabled={appState === AppState.PARSING || appState === AppState.RENDERING || !csvInput}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
            >
              {appState === AppState.PARSING ? (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {appState === AppState.PARSING ? 'Processando...' : 'Gerar Visualização'}
            </button>
          </div>

          {/* Statistics Section */}
          {stats && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 border-t border-slate-700 pt-4">
                <BarChart3 className="w-4 h-4" />
                Estatísticas
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-400">Total Pontos</p>
                  <p className="text-xl font-bold text-white">{stats.totalPoints.toLocaleString()}</p>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-400">Categorias</p>
                  <p className="text-xl font-bold text-white">{Object.keys(stats.speciesDistribution).length}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Distribuição por Espécie</p>
                {Object.entries(stats.speciesDistribution).map(([type, count]) => {
                   const typeNum = parseInt(type);
                   const label = SPECIES_DESCRIPTION[typeNum] || `Espécie ${type}`;
                   return (
                    <div key={type} className="flex items-start justify-between text-xs group py-1 border-b border-slate-800 last:border-0">
                      <div className="flex items-start gap-2 pr-2">
                        <div 
                          className="w-2 h-2 rounded-full mt-1 flex-shrink-0" 
                          style={{ backgroundColor: SPECIES_COLORS[typeNum] || SPECIES_COLORS[0] }} 
                        />
                        <span className="text-slate-300 leading-tight">{label}</span>
                      </div>
                      <span className="font-mono text-slate-400 font-bold">{count.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Info/Warning */}
          {appState === AppState.READY && stats && stats.totalPoints > 50000 && (
             <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg flex gap-3">
               <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
               <p className="text-xs text-amber-200">
                 Modo de alta densidade ativado (+50k pontos).
               </p>
             </div>
          )}
        </div>
      )}
      
      {!isExpanded && (
        <div className="flex flex-col items-center mt-6 space-y-6">
          <button 
            onClick={() => setIsExpanded(true)}
            className="p-3 bg-blue-600 rounded-xl text-white hover:bg-blue-500 shadow-lg"
          >
            <Upload className="w-5 h-5" />
          </button>
           <button 
            onClick={onOpenInfo}
            className="p-3 bg-slate-800 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <Info className="w-5 h-5" />
          </button>
          {stats && (
            <div className="flex flex-col gap-2 items-center">
               <div className="w-2 h-2 rounded-full bg-emerald-500" />
               <span className="text-[10px] text-slate-400 font-mono">{Math.floor(stats.totalPoints / 1000)}k</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
