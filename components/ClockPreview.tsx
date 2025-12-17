'use client';

import { useEffect, useState } from 'react';

interface ClockPreviewProps {
  name: string;
  clockId: string;
}

export default function ClockPreview({ name, clockId }: ClockPreviewProps) {
  // Inicializar con un valor fijo para evitar problemas de hidratación
  // Usar una fecha base que será consistente entre servidor y cliente
  const [time, setTime] = useState<Date>(() => new Date(2024, 0, 1, 12, 0, 0));
  const [videoDuration] = useState(15); // Duración del video en vivo: 15-20 segundos
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Solo establecer el tiempo real después de que el componente se monte en el cliente
    setMounted(true);
    setTime(new Date());
    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-amber-900/30 via-amber-800/20 to-slate-900 dark:from-slate-900 dark:via-amber-900/30 dark:to-slate-800 flex items-center justify-center overflow-hidden">
      {/* Efecto de luz ambiental */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.15)_0%,transparent_70%)]"></div>
      
      {/* Patrón decorativo sutil de fondo */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}></div>
      </div>
      
      {/* Placeholder para video en vivo del reloj antiguo */}
      {/* TODO: Reemplazar con video real de la cámara (15-20 segundos) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Simulación visual del reloj antiguo */}
        <div className="text-center relative z-10">
          {/* Representación visual del reloj antiguo */}
          <div className="mb-4 relative">
            {/* Sombra del reloj */}
            <div className="absolute inset-0 blur-xl bg-amber-900/30 dark:bg-amber-600/20 rounded-full scale-125"></div>
            
            {/* Marco decorativo exterior */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-700/30 dark:border-amber-500/30 scale-110"></div>
            
            {/* Reloj principal */}
            <div className="w-36 h-36 mx-auto rounded-full border-4 border-amber-800/80 dark:border-amber-600/80 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 shadow-[0_0_30px_rgba(180,83,9,0.4)] dark:shadow-[0_0_30px_rgba(217,119,6,0.3)] flex items-center justify-center relative backdrop-blur-sm">
              {/* Números del reloj (marcadores) */}
              <div className="absolute inset-0">
                {[12, 3, 6, 9].map((num, idx) => {
                  const angle = (num * 30 - 90) * (Math.PI / 180);
                  const radius = 42;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <div
                      key={num}
                      className="absolute w-1 h-1 rounded-full bg-amber-900/60 dark:bg-amber-400/60"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  );
                })}
              </div>
              
              {/* Manecillas del reloj */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Manecilla de horas */}
                <div 
                  className="absolute w-1.5 bg-amber-900 dark:bg-amber-400 origin-bottom rounded-full shadow-sm transition-transform duration-300"
                  style={{
                    height: '28%',
                    transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                />
                {/* Manecilla de minutos */}
                <div 
                  className="absolute w-0.5 bg-amber-800 dark:bg-amber-500 origin-bottom rounded-full shadow-sm transition-transform duration-300"
                  style={{
                    height: '38%',
                    transform: `rotate(${time.getMinutes() * 6}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                />
                {/* Manecilla de segundos (opcional, más sutil) - solo mostrar cuando esté montado */}
                {mounted && (
                  <div 
                    className="absolute w-0.5 bg-red-600/70 dark:bg-red-400/70 origin-bottom rounded-full"
                    style={{
                      height: '35%',
                      transform: `rotate(${time.getSeconds() * 6}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  />
                )}
                {/* Centro del reloj */}
                <div className="absolute w-3.5 h-3.5 rounded-full bg-amber-900 dark:bg-amber-400 shadow-lg z-10 border-2 border-amber-50 dark:border-slate-800"></div>
              </div>
            </div>
          </div>
          
          {/* Hora digital */}
          <div className="text-xl font-serif text-amber-900 dark:text-amber-200 font-bold tracking-wider drop-shadow-sm">
            {hours}:{minutes}
            {mounted && (
              <span className="text-sm font-normal text-amber-700/70 dark:text-amber-400/70 ml-1">:{seconds}</span>
            )}
          </div>
          <div className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-1.5 font-medium">{name}</div>
        </div>
      </div>
      
      {/* Indicador de "en vivo" mejorado */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-lg"></span>
        </span>
        <span className="text-xs text-white font-bold bg-gradient-to-r from-red-600/90 to-red-500/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-lg border border-red-400/30">
          EN VIVO
        </span>
      </div>
      
      {/* Nota sobre duración del video mejorada */}
      <div className="absolute bottom-3 left-3 text-xs text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-md z-20 border border-white/10 shadow-lg">
        <span className="font-semibold">{videoDuration}s</span> en vivo
      </div>
      
      {/* Efecto de borde brillante sutil */}
      <div className="absolute inset-0 border border-amber-500/10 dark:border-amber-400/10 pointer-events-none"></div>
    </div>
  );
}

