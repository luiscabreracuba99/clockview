import ClockCard from '@/components/ClockCard';

// Datos de ejemplo de relojes antiguos
const clocks = [
  {
    id: '1',
    name: 'Reloj de Péndulo Francés',
    location: 'Colección Principal',
    year: '1890',
    status: 'online' as const,
  },
  {
    id: '2',
    name: 'Reloj de Caja Larga Inglesa',
    location: 'Sala de Exposición',
    year: '1875',
    status: 'online' as const,
  },
  {
    id: '3',
    name: 'Reloj de Sobremesa Art Deco',
    location: 'Galería Este',
    year: '1925',
    status: 'online' as const,
  },
  {
    id: '4',
    name: 'Reloj de Torre Alemán',
    location: 'Atrio Central',
    year: '1850',
    status: 'online' as const,
  },
  {
    id: '5',
    name: 'Reloj de Bolsillo Dorado',
    location: 'Vitrina Especial',
    year: '1900',
    status: 'online' as const,
  },
  {
    id: '6',
    name: 'Reloj de Pared Suizo',
    location: 'Pasillo Norte',
    year: '1885',
    status: 'offline' as const,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-slate-50 to-amber-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(120, 53, 15, 0.1) 35px, rgba(120, 53, 15, 0.1) 70px)`,
        }}></div>
      </div>
      
      {/* Efectos de luz decorativos */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-300/20 dark:bg-amber-800/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header mejorado */}
        <header className="mb-12 text-center">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-600 dark:to-amber-800 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🕰️</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 dark:from-amber-300 dark:via-amber-200 dark:to-amber-300 bg-clip-text text-transparent drop-shadow-sm">
                ClockView
              </h1>
            </div>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
          </div>
          <p className="text-lg text-slate-700 dark:text-slate-300 font-light italic">
            Colección de relojes antiguos en funcionamiento
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>{clocks.filter(c => c.status === 'online').length} relojes activos</span>
          </div>
        </header>

        {/* Panel de relojes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clocks.map((clock) => (
            <ClockCard
              key={clock.id}
              id={clock.id}
              name={clock.name}
              location={clock.location}
              year={clock.year}
              status={clock.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
