import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

export default function HealingPage() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 bg-[#fdfcf8] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(230,81,0,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(255,179,0,0.1),transparent_40%)]" />
        <div className="absolute inset-0 chinese-pattern opacity-25" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Направление
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-neutral-900 uppercase tracking-tight mb-6 leading-[0.9]">
              Способы исцеления
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] animate-gradient-text">
                Практики восстановления
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 max-w-xl border-l-2 border-primary pl-6">
              Подборки методик для восстановления энергии, снижения напряжения и укрепления здоровья.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 border-2 border-primary/30 rounded-2xl rotate-2" />
            <div className="absolute -inset-10 border-2 border-secondary/30 rounded-2xl -rotate-2" />
            <div className="relative rounded-2xl bg-white/90 border border-border shadow-[0_25px_80px_rgba(0,0,0,0.2)] p-8">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
                Превью направления
              </div>
              <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-4">
                Ресурс и восстановление
              </h2>
              <p className="text-neutral-700 mb-6">
                Сборник практик для мягкого возвращения энергии, улучшения сна и стабилизации нервной системы.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                <Play className="w-4 h-4" />
                Вводное видео
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Видео-сессии",
              text: "Короткие практики для снятия напряжения и восстановления дыхательного ритма.",
            },
            {
              title: "Методики расслабления",
              text: "Комплексы для работы со стрессом и восстановлением энергии.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]"
            >
              <div className="h-40 rounded-xl bg-[radial-gradient(circle_at_20%_20%,rgba(230,81,0,0.15),transparent_60%)] border border-neutral-100 mb-6" />
              <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900 mb-3">
                {item.title}
              </h3>
              <p className="text-neutral-700">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-6">
              Полезно знать
            </h2>
            <div className="grid gap-4 text-neutral-700">
              {[
                "Мягкие практики лучше работают при регулярности 3-4 раза в неделю.",
                "Сон — ключевой фактор восстановления, уделите ему внимание.",
                "Небольшие дыхательные паузы в течение дня дают заметный эффект.",
              ].map((item) => (
                <div key={item} className="border border-neutral-100 rounded-xl p-4 bg-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-6">
              Новости и обновления
            </h2>
            <div className="grid gap-4 text-neutral-700">
              {[
                "Добавили новый блок по восстановлению после стресса.",
                "Запущен мини-курс по дыхательным практикам.",
                "В расписании появились вечерние сессии.",
              ].map((item) => (
                <div key={item} className="border border-neutral-100 rounded-xl p-4 bg-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-neutral-900 text-white rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,179,0,0.15),transparent_55%)]" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-3">
                Получите доступ к практикам
              </h2>
              <p className="text-white/80">
                Зарегистрируйтесь, чтобы сохранить прогресс и начать обучение.
              </p>
            </div>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-neutral-900 font-black uppercase tracking-widest text-xs rounded-sm hover:bg-primary hover:text-white transition-colors"
            >
              Зарегистрироваться
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
