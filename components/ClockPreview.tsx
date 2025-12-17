'use client';

import { useEffect, useState } from 'react';

interface ClockPreviewProps {
  name: string;
  clockId: string;
}

// Carrusel de 5 fotos (por ahora repetimos la misma imagen para todos los slides)
// Usa /public/clocks/VR288FRONT.png como base
const SHARED_IMAGES = [
  '/clocks/VR288FRONT.png',
  '/clocks/VR288FRONT.png',
  '/clocks/VR288FRONT.png',
  '/clocks/VR288FRONT.png',
  '/clocks/VR288FRONT.png',
];

export default function ClockPreview({ name, clockId }: ClockPreviewProps) {
  // Fecha base fija para evitar problemas de hidratación
  const [time, setTime] = useState<Date>(() => new Date(2024, 0, 1, 12, 0, 0));
  const [videoDuration] = useState(15); // Duración del video en vivo: 15-20 segundos
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Todos los relojes usan la misma foto
  const images = SHARED_IMAGES;

  useEffect(() => {
    // Activar tiempo real en el cliente
    setMounted(true);
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Carrusel automático de imágenes (opcional)
    if (images.length <= 1) return;

    const slider = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(slider);
  }, [images.length]);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full h-full flex items-stretch justify-center overflow-hidden">
      {/* Foto del reloj (carrusel) */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
      </div>

      {/* Capa de degradado para legibilidad */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />

      {/* Contenido inferior: hora + botón */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 z-20">
        <div>
          <div className="text-xl font-serif text-white font-bold tracking-wider drop-shadow-sm">
            {hours}:{minutes}
            {mounted && (
              <span className="text-sm font-normal text-white/80 ml-1">:{seconds}</span>
            )}
          </div>
          <div className="text-xs text-white/80 mt-1 font-medium line-clamp-1">{name}</div>
        </div>

        {/* Botón Ver en vivo (sin lógica todavía) */}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-black shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          Ver en vivo
        </button>
      </div>

      {/* Botones de navegación izquierda/derecha */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Imagen anterior"
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 text-white shadow-lg border border-white/20 transition-all duration-200"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Imagen siguiente"
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % images.length)
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 text-white shadow-lg border border-white/20 transition-all duration-200"
          >
            ›
          </button>
        </>
      )}

      {/* Puntos del carrusel */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-4 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Borde sutil */}
      <div className="absolute inset-0 border border-white/10 pointer-events-none" />
    </div>
  );
}

