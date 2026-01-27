import Link from "next/link";
import { ArrowUpRight, Check, Play } from "lucide-react";

const pricing = [
  {
    name: "Основной курс",
    price: "7 200 ₽",
    description: "Погружение и самогипноз",
    features: ["14 занятий", "Практикумы по состояниям", "Доступ 3 месяца"],
    highlight: true,
  },
  {
    name: "Музыка",
    price: "1 200 ₽",
    description: "Фон для погружения",
    features: ["9 треков", "Без слов", "Доступ навсегда"],
  },
];

export default function HypnosisPage() {
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
              Гипноз
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] animate-gradient-text">
                Управление состоянием
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 max-w-xl border-l-2 border-primary pl-6">
              Методика безопасного погружения и работы с внутренними настройками без перегрузки.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/auth/register"
                className="px-8 py-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary transition-colors shadow-lg shadow-black/10"
              >
                Начать обучение
              </Link>
              <Link
                href="#pricing"
                className="px-8 py-4 border border-neutral-200 text-neutral-700 text-xs font-bold uppercase tracking-widest rounded-sm hover:border-primary/40 hover:text-primary transition-colors"
              >
                Смотреть тарифы
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 border-2 border-primary/30 rounded-2xl rotate-2" />
            <div className="absolute -inset-10 border-2 border-secondary/30 rounded-2xl -rotate-2" />
            <div className="relative rounded-2xl bg-neutral-900 text-white shadow-[0_25px_80px_rgba(0,0,0,0.35)] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,179,0,0.2),transparent_55%)]" />
              <div className="relative p-8">
                <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-4">
                  Превью направления
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
                  Глубокий фокус
                </h2>
                <p className="text-white/80 mb-6">
                  Освойте расслабление, управление вниманием и работу с привычками в безопасном режиме.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary">
                  <Play className="w-4 h-4" />
                  Видео-демо техники
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Техника погружения",
              text: "Пошаговые сценарии и безопасные протоколы входа в состояние.",
            },
            {
              title: "Практика саморегуляции",
              text: "Инструменты для снижения тревожности и улучшения сна.",
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

        <div id="pricing" className="mt-16">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 uppercase tracking-tight mb-8">
            Тарифы
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white/90 ${
                  plan.highlight ? "border-primary/60" : "border-border"
                }`}
              >
                <div className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
                  {plan.name}
                </div>
                <div className="text-3xl font-black text-neutral-900 mb-2">{plan.price}</div>
                <div className="text-sm text-neutral-500 mb-4">{plan.description}</div>
                <ul className="space-y-3 text-sm text-neutral-700 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/account"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary transition-colors"
                >
                  Купить
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          <div className="bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-6">
              Полезно знать
            </h2>
            <div className="grid gap-4 text-neutral-700">
              {[
                "Лучшее время практики — вечер, когда нервная система готова к расслаблению.",
                "Не выполняйте упражнения за рулем или во время активной деятельности.",
                "Постепенное погружение дает стабильный эффект.",
              ].map((item) => (
                <div key={item} className="border border-neutral-100 rounded-xl p-4 bg-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-6">
              Новости
            </h2>
            <div className="grid gap-4 text-neutral-700">
              {[
                "Обновили практику по работе с тревожностью.",
                "Добавлен блок по восстановлению сна.",
                "Новый модуль по саморегуляции доступен в записи.",
              ].map((item) => (
                <div key={item} className="border border-neutral-100 rounded-xl p-4 bg-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-neutral-900 text-white rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,179,0,0.15),transparent_55%)]" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-3">
                Готовы к практике?
              </h2>
              <p className="text-white/80">
                Зарегистрируйтесь и начните тренировки в удобном ритме.
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
