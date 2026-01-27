import { Brain, Activity, HeartPulse } from "lucide-react";

const principles = [
  {
    title: "Нервная система",
    text: "Баланс симпатической и парасимпатической систем через дыхательные циклы и ритм.",
    icon: <Brain className="w-5 h-5" />,
  },
  {
    title: "Движение и фасции",
    text: "Плавные связки активируют фасциальные линии и восстанавливают подвижность.",
    icon: <Activity className="w-5 h-5" />,
  },
  {
    title: "Восстановление",
    text: "Сон, дыхание и микро-паузы — три точки быстрой регенерации.",
    icon: <HeartPulse className="w-5 h-5" />,
  },
];

export default function BodyPrinciples() {
  return (
    <section className="py-24 bg-[#fdfcf8] relative overflow-hidden">
      <div className="absolute inset-0 chinese-pattern opacity-20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-tighter mb-6">
              Принципы работы организма
            </h2>
            <p className="text-lg text-neutral-700 max-w-xl border-l-2 border-primary pl-6">
              Мы строим практику вокруг простых и наблюдаемых физиологических процессов — так формируется устойчивый результат.
            </p>
          </div>
          <div className="grid gap-4">
            {principles.map((item) => (
              <div
                key={item.title}
                className="bg-white/90 border border-neutral-100 rounded-2xl p-6 shadow-[0_15px_45px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-neutral-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
