import { HeartPulse, Stethoscope, Wind } from "lucide-react";

const steps = [
  {
    title: "Диагностика состояния",
    text: "Определяем, где напряжение и какие системы требуют внимания.",
    icon: <Stethoscope className="w-5 h-5" />,
  },
  {
    title: "Мягкая коррекция",
    text: "Дыхание, движения и ритм для снижения воспалительных реакций.",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    title: "Закрепление",
    text: "Регулярность и контроль прогресса для устойчивого результата.",
    icon: <HeartPulse className="w-5 h-5" />,
  },
];

export default function HealingProcess() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-tighter mb-4">
            Как лечатся болезни
          </h2>
          <div className="w-24 h-1.5 bg-secondary" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="bg-white/90 border border-neutral-100 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">
                  0{index + 1}
                </div>
              </div>
              <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
