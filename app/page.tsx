import ClockCard from '@/components/ClockCard';

// Datos de ejemplo de relojes antiguos (solo 4 relojes)
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
];

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            ClockView
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Colección de relojes antiguos en funcionamiento
          </p>
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
