'use client';

import ClockPreview from './ClockPreview';

interface ClockCardProps {
  id: string;
  name: string;
  location?: string;
  year?: string;
  status?: 'online' | 'offline';
}

export default function ClockCard({ id, name, location, year, status = 'online' }: ClockCardProps) {
  return (
    <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-700 hover:-translate-y-1">
      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 via-amber-50/0 to-amber-100/0 group-hover:from-amber-50/50 group-hover:via-amber-50/30 group-hover:to-amber-100/50 dark:group-hover:from-amber-900/20 dark:group-hover:via-amber-900/10 dark:group-hover:to-amber-800/20 transition-all duration-500 pointer-events-none"></div>
      
      {/* Marco decorativo superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Vista previa del reloj - preparado para video en vivo de 15-20 segundos */}
      <div className="aspect-video relative bg-gradient-to-br from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
        {/* Efecto de vidrio esmerilado sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none z-10"></div>
        
        {status === 'online' ? (
          <ClockPreview name={name} clockId={id} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center relative">
            {/* Patrón de fondo para estado offline */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)`,
            }}></div>
            <div className="text-center relative z-10">
              <div className="text-slate-400 dark:text-slate-500 mb-2 text-5xl animate-pulse">⏸</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Cámara desconectada</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Información de la ficha */}
      <div className="p-5 bg-gradient-to-br from-white/90 to-amber-50/40 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-sm relative z-10">
        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors duration-300">
          {name}
        </h3>
        <div className="space-y-2 mb-4">
          {year && (
            <div className="flex items-center gap-2">
              <span className="text-base">🕰️</span>
              <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold tracking-wide">
                {year}
              </p>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2">
              <span className="text-sm">📍</span>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {location}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all duration-300 ${
              status === 'online'
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/50 dark:to-emerald-900/50 dark:text-green-200 group-hover:shadow-md'
                : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 dark:from-gray-700 dark:to-slate-700 dark:text-gray-300'
            }`}
          >
            <span className={`relative flex h-1.5 w-1.5 ${status === 'online' ? 'animate-pulse' : ''}`}>
              {status === 'online' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            </span>
            {status === 'online' ? 'En funcionamiento' : 'Detenido'}
          </span>
        </div>
      </div>
      
      {/* Sombra decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}

