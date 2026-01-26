import Link from 'next/link';
import { PlayCircle } from 'lucide-react';

const videos = [
  { id: 1, title: 'Утренняя разминка', duration: '15 мин' },
  { id: 2, title: 'Для здоровья спины', duration: '20 мин' },
  { id: 3, title: 'Суставная гимнастика', duration: '25 мин' },
  { id: 4, title: 'Вечерний комплекс', duration: '12 мин' },
];

export default function GymnasticsBlock() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">Лечебная гимнастика</h2>
        <p className="max-w-2xl mx-auto text-accent/60 mb-12">
          Простые и эффективные упражнения для восстановления подвижности суставов, 
          укрепления мышечного корсета и улучшения общего самочувствия.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {videos.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden mb-4 shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                  <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <h3 className="font-bold text-accent group-hover:text-primary transition-colors">
                {video.title}
              </h3>
            </div>
          ))}
        </div>

        <Link 
          href="/gymnastics" 
          className="inline-flex items-center justify-center px-10 py-4 bg-secondary text-accent font-bold rounded-lg hover:bg-secondary/80 transition-all shadow-md"
        >
          Перейти в раздел гимнастики
        </Link>
      </div>
    </section>
  );
}
