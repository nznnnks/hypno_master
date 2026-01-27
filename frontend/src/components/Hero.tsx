import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#fdfcf8] pt-20">
      {/* Background Layer: Deep Texture and Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(230,81,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,179,0,0.08),transparent_40%)]" />
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] invert" />
        
        {/* Thematic Background Image (Blurred and darkened) */}
        <img 
          src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80" 
          alt="Background" 
          className="w-full h-full object-cover opacity-[0.03] blur-sm"
        />
        
        {/* Master's Presence Glow */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Content: Powerful Typography */}
          <div className="w-full lg:w-3/5 text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Обучение основано на научном подходе
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-neutral-900 mb-8 leading-[0.85] tracking-tighter uppercase">
              Нейрофизиология <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] animate-gradient-text">
                Без мистики
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-700 mb-8 leading-tight max-w-xl font-light border-l-2 border-primary pl-6">
              Нервную систему человека можно тренировать, как <span className="text-neutral-950 font-semibold">мышцы атлета</span> или <span className="text-neutral-950 font-semibold">ум гения</span>. 
              Результат — это технология и регулярность.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <button className="group relative px-12 py-6 bg-primary text-white font-black rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(230,81,0,0.4)] uppercase tracking-widest text-sm shadow-xl shadow-primary/20">
                <span className="relative z-10">Начать обучение</span>
                <div className="absolute inset-0 bg-neutral-950 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
              
              <button className="flex items-center gap-4 text-neutral-600 hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold group">
                <div className="w-12 h-12 rounded-full border-2 border-neutral-200 flex items-center justify-center group-hover:border-primary transition-colors bg-white">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                Смотреть мастер-класс
              </button>
            </div>
          </div>

          {/* Right Content: Master Photo Card */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-start items-center relative z-20 order-1 lg:order-2 lg:-ml-12">
            <div className="relative w-full max-w-[450px] aspect-[4/5]">
              {/* Decorative elements (Static) */}
              <div className="absolute -inset-6 border-2 border-primary/40 rounded-2xl rotate-3" />
              <div className="absolute -inset-10 border-2 border-secondary/30 rounded-2xl -rotate-3" />
              
              {/* Main Photo Card */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-800 shadow-[0_20px_80px_rgba(230,81,0,0.25)] border border-white/10">
                {/* Background: Blurred version of the image with a lighter overlay */}
                <div className="absolute inset-0 bg-neutral-700" />
                <img 
                  src="/photo_2026-01-23_00-16-25.png" 
                  alt="Мастер фон" 
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-40 blur-[8px]"
                />
                
                {/* Foreground: Sharp top part of the image */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    maskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 95%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 95%)'
                  }}
                >
                  <img 
                    src="/photo_2026-01-23_00-16-25.png" 
                    alt="Мастер лицо" 
                    className="w-full h-full object-cover object-top opacity-100 brightness-[1.1]"
                  />
                </div>
                
                {/* Information Overlay (Always Visible) */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">Мастер Ци</h3>
                  <div className="w-12 h-1 bg-primary mb-4" />
                  <ul className="space-y-3">
                    {[
                      "Биолог, нейрофизиолог",
                      "Мастер ушу и цигун",
                      "Эксперт по гипнозу",
                      "Энергопрактик"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/90 text-sm font-medium tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,179,0,0.8)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Corner Accents (Static) */}
                <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-primary/80" />
                <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-secondary/80" />
              </div>

              {/* Orbits/Circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-neutral-900/5 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-neutral-900/5 rounded-full -z-10 animate-[spin_30s_linear_infinite_reverse]" />
            </div>
          </div>

        </div>
      </div>
      
    </section>
  );
}
