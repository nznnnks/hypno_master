import Link from 'next/link';
import { Wind, Eye, Zap, Sparkles } from 'lucide-react';

const directions = [
  {
    id: 'qigong',
    title: 'Цигун',
    description: 'Древнекитайская система дыхательных и физических упражнений для долголетия.',
    icon: <Wind className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80',
    href: '/qigong'
  },
  {
    id: 'clairvoyance',
    title: 'Ясновидение',
    description: 'Развитие интуиции и работа с тонкими энергиями пространства.',
    icon: <Eye className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80',
    href: '/clairvoyance'
  },
  {
    id: 'influence',
    title: 'Воздействие',
    description: 'Методики передачи энергии и оздоровления на расстоянии.',
    icon: <Zap className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80',
    href: '/influence'
  },
  {
    id: 'healing',
    title: 'Исцеление',
    description: 'Обзор нетрадиционных и альтернативных методов восстановления здоровья.',
    icon: <Sparkles className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80',
    href: '/healing'
  },
];

export default function CategoriesBlock() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-tighter mb-4">
            Наши <span className="text-primary">Направления</span>
          </h2>
          <div className="w-24 h-1.5 bg-secondary" />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
          {directions.map((dir) => (
            <Link 
              key={dir.id} 
              href={dir.href}
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-neutral-900 transition-all duration-700 lg:flex-1 hover:lg:flex-[2] min-h-[400px] lg:min-h-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={dir.image} 
                  alt={dir.title} 
                  className="w-full h-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                  {dir.icon}
                </div>
                
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                  {dir.title}
                </h3>
                
                <p className="text-white/70 text-sm leading-relaxed opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-h-40 group-hover:mb-4">
                  {dir.description}
                </p>

                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Подробнее 
                  <Zap className="w-3 h-3 fill-current" />
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-8 border-t-2 border-r-2 border-white/30" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
