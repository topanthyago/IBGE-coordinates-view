import React from 'react';
import { X, ExternalLink, Download, FileText, Info } from 'lucide-react';
import { IBGE_DOWNLOAD_URL, SPECIES_DESCRIPTION, GEO_CODING_DESCRIPTION } from '../constants';

interface DataInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DataInfoModal: React.FC<DataInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-400" />
              Sobre os Dados (IBGE Censo 2022)
            </h2>
            <p className="text-slate-400 text-sm mt-1">Cadastro Nacional de Endereços para Fins Estatísticos (CNEFE)</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          
          {/* Section: Download */}
          <section className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-200 flex items-center gap-2 mb-3">
              <Download className="w-5 h-5" />
              Obter Dados Oficiais
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              Os dados utilizados nesta visualização são públicos e fornecidos pelo IBGE. Para baixar os dados da sua cidade:
            </p>
            <div className="flex gap-4 flex-wrap">
              <a 
                href={IBGE_DOWNLOAD_URL} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Acessar Repositório IBGE
              </a>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Caminho: Censo Demográfico 2022 &gt; Coordenadas_enderecos &gt; Municipio &gt; [Seu Estado]
            </p>
          </section>

          {/* Section: Dicionário de Dados */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Dicionário de Variáveis
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-bold text-slate-200 mb-3 text-sm uppercase tracking-wider">COD_ESPECIE (Tipo de Endereço)</h4>
                <ul className="space-y-2">
                  {Object.entries(SPECIES_DESCRIPTION).map(([key, desc]) => (
                    <li key={key} className="flex gap-3 text-xs">
                      <span className="font-mono bg-slate-700 px-1.5 rounded text-slate-300 h-fit">{key}</span>
                      <span className="text-slate-400">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-bold text-slate-200 mb-3 text-sm uppercase tracking-wider">NV_GEO_COORD (Precisão)</h4>
                <ul className="space-y-2">
                  {Object.entries(GEO_CODING_DESCRIPTION).map(([key, desc]) => (
                    <li key={key} className="flex gap-3 text-xs">
                      <span className="font-mono bg-slate-700 px-1.5 rounded text-slate-300 h-fit">{key}</span>
                      <span className="text-slate-400">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Contexto/Notícia */}
          <section className="border-t border-slate-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Contexto Histórico</h3>
            <div className="prose prose-invert prose-sm max-w-none text-slate-300">
              <p>
                Pela primeira vez, o IBGE divulga as coordenadas geográficas de todas as espécies de endereços do país, coletadas durante o Censo 2022. 
                O Censo registrou <strong>111,1 milhões de coordenadas</strong>.
              </p>
              <p>
                Esses dados permitem que órgãos governamentais contabilizem com precisão domicílios expostos a riscos (enchentes, deslizamentos) e auxiliam no planejamento urbano.
                Do total de endereços, 81,5% são domicílios particulares.
              </p>
              <blockquote className="border-l-4 border-slate-600 pl-4 italic text-slate-400 my-4">
                "Através de filtros espaciais, conseguimos saber quantos domicílios particulares estão dentro de áreas de impacto ou suscetíveis, bem como os estabelecimentos de outras finalidades..." 
                <br/>— Eduardo Baptista, Gerente do Cadastro de Endereços do IBGE.
              </blockquote>
              <p className="text-xs text-slate-500">
                Fonte: <a href="https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/39065-ibge-divulga-pela-primeira-vez-as-coordenadas-geograficas-dos-enderecos-do-pais" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Agência de Notícias IBGE (02/02/2024)</a>
              </p>
            </div>
          </section>

        </div>
        
        {/* Footer */}
        <div className="p-4 bg-slate-800 border-t border-slate-700 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataInfoModal;
