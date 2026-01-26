export default function About() {
  return (
    <section className="py-20 chinese-pattern">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-primary" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-primary" />
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" 
                alt="О проекте" 
                className="rounded-lg shadow-2xl relative z-10"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6 flex items-center gap-4">
              <span className="text-primary text-5xl">|</span>
              О проекте «Без Мистики»
            </h2>
            <div className="space-y-4 text-lg text-accent/70">
              <p>
                Мы предлагаем научный подход к традиционным восточным практикам. 
                В нашей работе мы исключаем любые элементы эзотерики, магии или 
                необъяснимых «энергий», фокусируясь на анатомии и физиологии.
              </p>
              <p>
                Каждое упражнение в Цигун или Йоге имеет под собой четкое биологическое 
                обоснование: работа с фасциями, улучшение лимфотока, коррекция осанки 
                и гармонизация работы нервной системы.
              </p>
              <p>
                Наш проект — это мост между древним опытом и современными знаниями 
                о человеческом теле. Мы учим вас управлять своим здоровьем, 
                основываясь на фактах и измеримых результатах.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="p-4 bg-white shadow-md rounded-lg border-l-4 border-secondary">
                <div className="font-bold text-2xl text-primary">15+</div>
                <div className="text-sm text-accent/60 uppercase tracking-wider">Лет опыта</div>
              </div>
              <div className="p-4 bg-white shadow-md rounded-lg border-l-4 border-secondary">
                <div className="font-bold text-2xl text-primary">10k+</div>
                <div className="text-sm text-accent/60 uppercase tracking-wider">Учеников</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
