import Link from 'next/link';
import { BookOpen, Star, Quote, ArrowUpRight, Calendar } from 'lucide-react';

const usefulArticles = [
  { 
    id: 1, 
    title: '5 правил правильного дыхания для управления стрессом', 
    date: '20 Янв 2026', 
    category: 'Нейрофизиология',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80',
    description: 'Как через осознанный контроль дыхания влиять на блуждающий нерв и мгновенно снижать уровень кортизола.'
  },
  { 
    id: 2, 
    title: 'Биохакинг мозга: как Цигун меняет структуру серого вещества', 
    date: '18 Янв 2026', 
    category: 'Исследования',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80',
    description: 'Научный взгляд на древние практики: данные МРТ-сканирования мастеров после 10 лет регулярных тренировок.'
  },
  { 
    id: 3, 
    title: 'Питание для энергетических практик: мифы и реальность', 
    date: '15 Янв 2026', 
    category: 'Биохимия',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80',
    description: 'Почему уровень глюкозы в крови напрямую связан с вашей способностью к концентрации и работе с энергией.'
  },
];

const reviews = [
  { 
    id: 1, 
    name: 'Александр Колесников', 
    role: 'Предприниматель',
    text: 'Методика полностью перевернула мое представление о возможностях организма. Никакой эзотерики — только чистая физиология и работающие техники. За 2 месяца увеличил продуктивность в разы.', 
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
  },
  { 
    id: 2, 
    name: 'Елена Маркова', 
    role: 'Врач-терапевт',
    text: 'Как медик, я скептично относилась к подобным практикам. Но научный подход Мастера Ци убедил меня. Теперь использую элементы гимнастики в своей реабилитационной практике для пациентов.', 
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
  },
];

export default function InfoSection() {
  return (
    <section className="py-24 bg-[#fdfcf8] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Полезно знать */}
          <div className="lg:col-span-7">
            <div className="flex flex-col mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter">Полезно знать</h2>
              </div>
              <div className="w-20 h-1 bg-secondary" />
            </div>

            <div className="space-y-6">
              {usefulArticles.map((article) => (
                <Link 
                  key={article.id} 
                  href={`/useful/${article.id}`} 
                  className="group flex flex-col md:flex-row gap-6 p-6 bg-white rounded-2xl border border-neutral-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                >
                  <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden rounded-xl shrink-0">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">
                      {article.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                      Читать статью <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <button className="mt-10 w-full md:w-auto px-8 py-4 border-2 border-neutral-200 text-neutral-900 font-bold rounded-sm hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all uppercase tracking-widest text-xs">
              Все публикации
            </button>
          </div>

          {/* Отзывы */}
          <div className="lg:col-span-5">
            <div className="flex flex-col mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                  <Quote className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter">Результаты</h2>
              </div>
              <div className="w-20 h-1 bg-primary" />
            </div>

            <div className="space-y-8">
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="relative p-10 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-neutral-50 group hover:shadow-[0_30px_60px_rgba(230,81,0,0.08)] transition-all duration-500"
                >
                  <div className="absolute top-8 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-16 h-16 text-primary" />
                  </div>
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  
                  <p className="text-neutral-700 text-lg leading-relaxed mb-8 relative z-10 font-medium">
                    "{review.text}"
                  </p>
                  
                  <div className="flex items-center gap-4 border-t border-neutral-50 pt-8">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                      <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900">{review.name}</h4>
                      <p className="text-neutral-400 text-xs uppercase tracking-widest">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-8 bg-neutral-900 rounded-3xl text-white relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-bold mb-2 relative z-10">Хотите изменить свою жизнь?</h3>
                <p className="text-neutral-400 text-sm mb-6 relative z-10">Запишитесь на бесплатную консультацию и узнайте свои возможности.</p>
                <button className="flex items-center gap-2 text-secondary font-black uppercase tracking-widest text-xs relative z-10 group-hover:gap-4 transition-all">
                  Связаться с мастером <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
