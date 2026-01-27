import Link from "next/link";
import { ArrowUpRight, BookOpen, Sparkles, Target, Users, HeartPulse } from "lucide-react";

const directions = [
  {
    title: "Цигун",
    subtitle: "Китайский + вьетнамский",
    href: "/qigong",
    description: "Практики дыхания и движения для стабилизации энергии.",
  },
  {
    title: "Ясновидение",
    subtitle: "Развитие интуиции",
    href: "/clairvoyance",
    description: "Тренировка внимания и чтение тонких сигналов.",
  },
  {
    title: "Дистанционное воздействие",
    subtitle: "Работа с вниманием на расстоянии",
    href: "/influence",
    description: "Фокусировка и передача намерения на дистанции.",
  },
  {
    title: "Гипноз",
    subtitle: "Практика и техника погружения",
    href: "/hypnosis",
    description: "Безопасное погружение и управление состояниями.",
  },
];

export default function DirectionsPage() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 bg-[#fdfcf8] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(230,81,0,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,179,0,0.1),transparent_40%)]" />
        <div className="absolute inset-0 chinese-pattern opacity-30" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Направления обучения
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-neutral-900 uppercase tracking-tight mb-6 leading-[0.9]">
              Дисциплина <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] animate-gradient-text">
                без мистики
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 max-w-xl border-l-2 border-primary pl-6">
              Выбирайте направление и перемещайтесь между блоками — методики соединяются в единую систему развития.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                <Sparkles className="w-4 h-4 text-secondary" />
                Система развития
              </div>
              <div className="h-0.5 w-24 bg-primary/30" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 border-2 border-primary/30 rounded-2xl rotate-2" />
            <div className="absolute -inset-10 border-2 border-secondary/30 rounded-2xl -rotate-2" />
            <div className="relative rounded-2xl bg-white/90 border border-border shadow-[0_25px_80px_rgba(0,0,0,0.2)] p-8 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,179,0,0.15),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(230,81,0,0.12),transparent_45%)]" />
              <div className="relative">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
                  Карта пути
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-neutral-900 uppercase tracking-tight mb-6">
                  Маршрут обучения
                </h2>
                <div className="space-y-4">
                  {[
                    "Диагностика текущего уровня",
                    "Выбор направления и целей",
                    "Системная практика и контроль",
                    "Закрепление результата",
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-4 border border-neutral-100 rounded-xl p-4 bg-white/80"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="text-neutral-800 font-semibold">{step}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  <span className="w-10 h-0.5 bg-primary/40" />
                  Движение без мистики
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex flex-col lg:flex-row gap-6">
            {directions.map((direction) => (
              <Link
                key={direction.title}
                href={direction.href}
                className="group relative flex-1 min-h-[260px] lg:min-h-[320px] rounded-2xl border border-border bg-white/90 shadow-[0_25px_70px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:flex-[1.4]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/20" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(230,81,0,0.18),transparent_50%)]" />
                </div>
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:border-primary/40 group-hover:text-primary transition-colors bg-white/80">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                      Направление
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-neutral-900 uppercase tracking-tight">
                      {direction.title}
                    </div>
                    <div className="mt-2 text-sm text-neutral-500">
                      {direction.subtitle}
                    </div>
                  </div>
                  <div className="mt-6 text-sm text-neutral-600 border-l-2 border-primary/40 pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {direction.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8">
          {directions.map((direction) => (
            <div
              key={`${direction.title}-details`}
              className="relative bg-white/90 border border-border rounded-2xl p-8 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              <div className="absolute inset-0 opacity-60">
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Направление
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-neutral-900 uppercase tracking-tight">
                    {direction.title}
                  </h2>
                  <div className="mt-2 text-sm text-neutral-500">{direction.subtitle}</div>
                </div>
                <Link
                  href={direction.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary transition-colors shadow-lg shadow-black/10"
                >
                  Перейти
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="relative grid gap-6 md:grid-cols-2">
                <div className="group rounded-2xl border border-neutral-100 bg-white/80 p-5 shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-colors duration-200 hover:border-primary/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                      История
                    </h3>
                  </div>
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    {direction.title === "Цигун" &&
                      "Цигун вырос из древних практик наблюдения за дыханием и движением. Он впитал в себя подходы китайской и вьетнамской школ, где важны мягкая структура тела, внимание и регулярность. В нашем подходе нет мистики — только биомеханика, ритм и дисциплина."}
                    {direction.title === "Ясновидение" &&
                      "Исторически это направление описывали как тренированную интуицию и способность замечать слабые сигналы. Мы рассматриваем его как развитие внимания, памяти и работы с ассоциациями, без мистических объяснений. Фокус — на тренировке наблюдательности и системности."}
                    {direction.title === "Дистанционное воздействие" &&
                      "Тема интересовала практиков еще в школах концентрации внимания. Мы трактуем ее как усиление намерения и умение удерживать фокус на цели. Это не про магию, а про устойчивую когнитивную дисциплину и управление вниманием."}
                    {direction.title === "Гипноз" &&
                      "Гипноз прошел путь от сценических эффектов до научной методики. Сегодня это работа с фокусом, расслаблением и сменой паттернов восприятия. Мы используем безопасные протоколы и объясняем каждый шаг через понятные механизмы."}
                  </p>
                </div>
                <div className="group rounded-2xl border border-neutral-100 bg-white/80 p-5 shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-colors duration-200 hover:border-primary/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                      Польза
                    </h3>
                  </div>
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    {direction.title === "Цигун" &&
                      "Регулярные занятия помогают снять мышечное напряжение, улучшить дыхательный паттерн и выровнять тонус. Практика дает ощущение устойчивости, мягкой силы и ясности."}
                    {direction.title === "Ясновидение" &&
                      "Практика повышает чувствительность к деталям, тренирует память и снижает шум в мышлении. Это дает более точные решения и спокойствие в сложных ситуациях."}
                    {direction.title === "Дистанционное воздействие" &&
                      "Развиваются устойчивость внимания, способность к долгой концентрации и уверенность в намерении. Это полезно в учебе, работе и управлении эмоциями."}
                    {direction.title === "Гипноз" &&
                      "Метод помогает быстрее восстанавливаться, уменьшать тревожность и менять привычки. Также улучшается качество сна и способность к глубокому расслаблению."}
                  </p>
                </div>
                <div className="group rounded-2xl border border-neutral-100 bg-white/80 p-5 shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-colors duration-200 hover:border-primary/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                      Для кого
                    </h3>
                  </div>
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    {direction.title === "Цигун" &&
                      "Подходит тем, кто хочет укрепить тело без перегрузок, вернуть энергию и выстроить спокойный ритм жизни. Отличный старт для новичков."}
                    {direction.title === "Ясновидение" &&
                      "Для тех, кто хочет лучше чувствовать людей и ситуации, развить интуицию и структурное мышление."}
                    {direction.title === "Дистанционное воздействие" &&
                      "Для людей, которым важны концентрация, уверенность и способность доводить дела до конца."}
                    {direction.title === "Гипноз" &&
                      "Для тех, кто хочет мягко и безопасно работать с внутренними блоками и стрессом."}
                  </p>
                </div>
                <div className="group rounded-2xl border border-neutral-100 bg-white/80 p-5 shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-colors duration-200 hover:border-primary/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                      Методика
                    </h3>
                  </div>
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    {direction.title === "Цигун" &&
                      "Структура занятий: разминка, базовые стойки, дыхательные связки и мягкое закрепление. Мы отслеживаем прогресс по ощущениям, дыханию и устойчивости."}
                    {direction.title === "Ясновидение" &&
                      "Мы работаем через упражнения на внимание, визуализацию и ассоциативное мышление. Важен дневник наблюдений и регулярная практика."}
                    {direction.title === "Дистанционное воздействие" &&
                      "Методика включает работу с намерением, дыхательные техники и задачи на удержание фокуса. Мы добавляем контрольные точки, чтобы видеть рост."}
                    {direction.title === "Гипноз" &&
                      "Сессии строятся от расслабления к управлению вниманием. Используем голосовые протоколы, якорение и безопасные сценарии выхода."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
