import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import MapViewer from './components/MapViewer';
import DataInfoModal from './components/DataInfoModal';
import { parseCSV } from './utils/parser';
import { AppState, GeoPoint, DatasetStats } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [points, setPoints] = useState<GeoPoint[]>([]);
  const [stats, setStats] = useState<DatasetStats | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleProcessData = useCallback(async (csvData: string) => {
    setAppState(AppState.PARSING);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      const { points: parsedPoints, stats: parsedStats } = await parseCSV(csvData);
      setAppState(AppState.RENDERING);
      
      setTimeout(() => {
        setPoints(parsedPoints);
        setStats(parsedStats);
        setAppState(AppState.READY);
      }, 50);

    } catch (error) {
      console.error("Error processing CSV", error);
      setAppState(AppState.ERROR);
      alert("Erro ao processar o CSV. Verifique o formato e tente novamente.");
    }
  }, []);

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden font-sans">
      <Sidebar 
        appState={appState}
        stats={stats}
        onProcessData={handleProcessData}
        onOpenInfo={() => setIsInfoOpen(true)}
      />
      
      <main className="flex-1 h-full relative">
        <MapViewer points={points} bounds={stats?.bounds || null} />
        
        {/* Empty State Overlay */}
        {appState === AppState.IDLE && (
          <div className="absolute inset-0 z-[500] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-8 pointer-events-none">
            <div className="text-center max-w-lg pointer-events-auto">
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">GeoToledo</h2>
              <p className="text-lg text-slate-300 mb-8 drop-shadow-md leading-relaxed">
                Visualizador de alto desempenho para o Censo Demográfico 2022.<br/>
                <span className="text-sm opacity-70">Cole o CSV do IBGE para iniciar.</span>
              </p>
              <button 
                onClick={() => setIsInfoOpen(true)}
                className="px-6 py-2 bg-slate-700/80 hover:bg-slate-600 text-white rounded-full text-sm font-medium transition-colors backdrop-blur border border-slate-600"
              >
                Saiba mais sobre os dados
              </button>
            </div>
          </div>
        )}
      </main>

      <DataInfoModal 
        isOpen={isInfoOpen} 
        onClose={() => setIsInfoOpen(false)} 
      />
    </div>
  );
};

export default App;
