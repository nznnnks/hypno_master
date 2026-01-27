import { FlaskConical, LineChart, ShieldCheck } from "lucide-react";

const items = [
  {
    title: "Проверяемость",
    text: "Каждое упражнение объясняется через физиологию, биомеханику и работу нервной системы.",
    icon: <FlaskConical className="w-6 h-6" />,
  },
  {
    title: "Измеримый прогресс",
    text: "Мы используем простые метрики: дыхание, тонус, выносливость, качество сна и внимания.",
    icon: <LineChart className="w-6 h-6" />,
  },
  {
    title: "Без эзотерики",
    text: "Только дисциплина, регулярность и понятные инструменты для самостоятельной практики.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
];

export default function ScienceAdvantage() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(230,81,0,0.08),transparent_45%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-tighter mb-4">
            Преимущество <span className="text-primary">научного подхода</span>
          </h2>
          <div className="w-24 h-1.5 bg-secondary" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white/90 border border-neutral-100 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
