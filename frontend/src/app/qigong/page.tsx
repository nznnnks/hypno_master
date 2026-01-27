import Link from "next/link";
import { ArrowUpRight, Check, Music2 } from "lucide-react";

const pricing = [
  {
    name: "Базовый",
    price: "3 900 ₽",
    description: "Старт для новичков",
    features: ["8 занятий", "Домашние задания", "Доступ 1 месяц"],
  },
  {
    name: "Оптимальный",
    price: "6 900 ₽",
    description: "Углубленная практика",
    features: ["16 занятий", "Чат с куратором", "Доступ 3 месяца"],
    highlight: true,
  },
  {
    name: "Премиальный",
    price: "11 900 ₽",
    description: "Максимум поддержки",
    features: ["24 занятия", "Личные разборы", "Доступ 6 месяцев"],
  },
  {
    name: "Музыка для Цигун",
    price: "1 200 ₽",
    description: "Аудиосопровождение",
    features: ["12 треков", "Фокус на дыхании", "Доступ навсегда"],
    icon: <Music2 className="w-5 h-5" />,
  },
];

export default function QigongPage() {
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
              Цигун
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] animate-gradient-text">
                Китайский + Вьетнамский
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 max-w-xl border-l-2 border-primary pl-6">
              Спокойная сила, дыхание и точность движений. Выберите формат обучения и начните практику уже сегодня.
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
            <div className="relative rounded-2xl bg-white/90 border border-border shadow-[0_25px_80px_rgba(0,0,0,0.2)] p-8">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
                Превью направления
              </div>
              <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-4">
                Тело как инструмент
              </h2>
              <p className="text-neutral-700 mb-6">
                Основы цигун опираются на плавность и ритм. В курсе вы научитесь управлять дыханием, снижать напряжение и выстраивать устойчивую осанку.
              </p>
              <div className="grid gap-3 text-sm text-neutral-600">
                {["Мягкая техника дыхания", "Гибкость и баланс", "Регулярные практики"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(255,179,0,0.7)]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white/90 border border-border rounded-2xl p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 uppercase tracking-tight mb-6">
            О направлении
          </h2>
          <div className="grid gap-6 md:grid-cols-2 text-neutral-700 leading-relaxed">
            <p>
              Цигун в нашей программе соединяет китайский и вьетнамский подходы: работа с дыханием,
              мягкие стойки и постепенное выравнивание тела. Это практики для людей, которым нужна
              устойчивость, энергия и ясная голова без перегруза.
            </p>
            <p>
              Мы не используем мистику — только проверенные техники, регулярность и внимательное
              отношение к ощущениям. Результат ощущается через несколько недель: спокойнее сон, меньше
              напряжение, больше контроля над состоянием.
            </p>
          </div>
        </div>

        <div id="pricing" className="mt-16">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-neutral-900 uppercase tracking-tight">
              Тарифы
            </h2>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
              Выберите формат
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white/90 ${
                  plan.highlight ? "border-primary/60" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold uppercase tracking-widest text-primary">
                    {plan.name}
                  </div>
                  {plan.icon}
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

        <div className="mt-16 grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-6">
              Полезно знать
            </h2>
            <div className="grid gap-4 text-neutral-700">
              {[
                "Первая практика длится 12 минут — этого достаточно, чтобы почувствовать эффект.",
                "Оптимальная регулярность — 4 раза в неделю, утром или вечером.",
                "В комплексе есть мягкие техники для спины и шеи.",
              ].map((item) => (
                <div key={item} className="border border-neutral-100 rounded-xl p-4 bg-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-neutral-900 text-white rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,179,0,0.15),transparent_55%)]" />
            <div className="relative">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
                Начните практику уже сегодня
              </h2>
              <p className="text-white/80 mb-6">
                Зарегистрируйтесь, выберите тариф и получите доступ к первым занятиям.
              </p>
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
      </div>
    </section>
  );
}
