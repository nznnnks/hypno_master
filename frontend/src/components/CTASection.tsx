import { Mail, UserPlus, Play, ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-neutral-950 overflow-hidden relative">
      {/* Sophisticated Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] opacity-30" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-20">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-secondary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Sparkles className="w-3 h-3" />
                Ваш новый этап начинается здесь
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[0.9] tracking-tighter uppercase">
                Готовы изменить <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">свою жизнь</span> к лучшему?
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                Мы объединили древние знания и современную нейрофизиологию, чтобы дать вам инструменты для полной трансформации сознания и тела.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-5 bg-primary text-white font-black rounded-sm uppercase tracking-widest text-xs hover:bg-white hover:text-neutral-900 transition-all duration-300 shadow-2xl shadow-primary/20">
                Начать сейчас
              </button>
              <button className="px-10 py-5 border border-white/20 text-white font-black rounded-sm uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                Узнать больше
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative p-10 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] transition-all duration-500 hover:translate-y-[-10px]">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">Персональная сессия</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Оставьте заявку на бесплатную диагностическую консультацию с Мастером Ци.
              </p>
              <button className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                Оставить заявку <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="group relative p-10 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-3xl hover:bg-white/[0.12] transition-all duration-500 hover:translate-y-[-10px] overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <UserPlus className="w-32 h-32 text-white" />
              </div>
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform duration-500">
                <UserPlus className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">Закрытый клуб</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Получите доступ к эксклюзивным материалам, вебинарам и сообществу единомышленников.
              </p>
              <button className="flex items-center gap-2 text-secondary text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                Регистрация <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="group relative p-10 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] transition-all duration-500 hover:translate-y-[-10px]">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500">
                <Play className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">База знаний</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Начните знакомство с нашими техниками через бесплатные вводные видеоуроки.
              </p>
              <button className="flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                Смотреть уроки <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
