import { ArrowRight } from "lucide-react";

export default function ApplicationForm() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(230,81,0,0.08),transparent_50%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-tighter mb-6">
              Форма заявки
            </h2>
            <p className="text-lg text-neutral-700 max-w-xl border-l-2 border-primary pl-6">
              Оставьте контакты — мы подберем направление и уровень, который даст быстрый результат.
            </p>
          </div>
          <form className="bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)] space-y-4">
            <input
              type="text"
              placeholder="Имя"
              className="w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white text-xs font-black uppercase tracking-widest rounded-sm hover:bg-primary transition-colors"
            >
              Отправить заявку
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
