import { Eye, Focus, Sparkles } from "lucide-react";

const stages = [
  {
    title: "Чувствительность",
    text: "Развитие восприятия через дыхание, паузы и расширение внимания.",
    icon: <Eye className="w-5 h-5" />,
  },
  {
    title: "Фокус",
    text: "Тренировка устойчивости и точности: внимание без лишнего шума.",
    icon: <Focus className="w-5 h-5" />,
  },
  {
    title: "Системность",
    text: "Дневник наблюдений, регулярные практики и контроль прогресса.",
    icon: <Sparkles className="w-5 h-5" />,
  },
];

export default function ExtrasensoryDevelopment() {
  return (
    <section className="py-24 bg-[#fdfcf8] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <div className="bg-neutral-900 text-white rounded-3xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,179,0,0.2),transparent_55%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                Как развиваются экстрасенсорики
              </h2>
              <p className="text-white/80">
                Это не магия, а тренировка внимания, памяти и устойчивости психики.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {stages.map((stage) => (
              <div
                key={stage.title}
                className="bg-white/90 border border-neutral-100 rounded-2xl p-6 shadow-[0_15px_45px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    {stage.icon}
                  </div>
                  <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tight">
                    {stage.title}
                  </h3>
                </div>
                <p className="text-neutral-600">{stage.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
