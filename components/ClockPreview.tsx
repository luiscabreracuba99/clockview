'use client';

import { useEffect, useState } from 'react';

interface ClockPreviewProps {
  name: string;
  clockId: string;
}

export default function ClockPreview({ name, clockId }: ClockPreviewProps) {
  const [time, setTime] = useState(new Date());
  const [videoDuration] = useState(15); // Duración del video en vivo: 15-20 segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-slate-900 dark:from-slate-900 dark:via-amber-900/20 dark:to-slate-800 flex items-center justify-center overflow-hidden">
      {/* Placeholder para video en vivo del reloj antiguo */}
      {/* TODO: Reemplazar con video real de la cámara (15-20 segundos) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Simulación visual del reloj antiguo */}
        <div className="text-center relative z-10">
          {/* Representación visual del reloj antiguo */}
          <div className="mb-4">
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-amber-800 dark:border-amber-600 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-slate-800 dark:to-slate-700 shadow-2xl flex items-center justify-center relative">
              {/* Manecillas del reloj */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Manecilla de horas */}
                <div 
                  className="absolute w-1 bg-amber-900 dark:bg-amber-400 origin-bottom"
                  style={{
                    height: '30%',
                    transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                />
                {/* Manecilla de minutos */}
                <div 
                  className="absolute w-0.5 bg-amber-800 dark:bg-amber-500 origin-bottom"
                  style={{
                    height: '40%',
                    transform: `rotate(${time.getMinutes() * 6}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                />
                {/* Centro del reloj */}
                <div className="absolute w-3 h-3 rounded-full bg-amber-900 dark:bg-amber-400" />
              </div>
            </div>
          </div>
          <div className="text-lg font-serif text-amber-900 dark:text-amber-200 font-semibold">
            {hours}:{minutes}
          </div>
          <div className="text-xs text-amber-700 dark:text-amber-400 mt-1">{name}</div>
        </div>
      </div>
      
      {/* Indicador de "en vivo" */}
      <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-xs text-white font-medium bg-black/50 px-1.5 py-0.5 rounded">EN VIVO</span>
      </div>
      
      {/* Nota sobre duración del video */}
      <div className="absolute bottom-2 left-2 text-xs text-white/70 bg-black/30 px-2 py-1 rounded z-20">
        {videoDuration}s en vivo
      </div>
    </div>
  );
}

