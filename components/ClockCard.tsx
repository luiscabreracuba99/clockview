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
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-amber-200 dark:border-amber-900/30">
      {/* Vista previa del reloj - preparado para video en vivo de 15-20 segundos */}
      <div className="aspect-video relative bg-gradient-to-br from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800">
        {status === 'online' ? (
          <ClockPreview name={name} clockId={id} />
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <div className="text-center">
              <div className="text-slate-400 dark:text-slate-500 mb-2 text-4xl">⏸</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Cámara desconectada</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Información de la ficha */}
      <div className="p-4 bg-gradient-to-br from-white to-amber-50/30 dark:from-slate-800 dark:to-slate-900">
        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">
          {name}
        </h3>
        <div className="space-y-1 mb-3">
          {year && (
            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
              🕰️ {year}
            </p>
          )}
          {location && (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              📍 {location}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              status === 'online'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {status === 'online' ? '● En funcionamiento' : '○ Detenido'}
          </span>
        </div>
      </div>
    </div>
  );
}

