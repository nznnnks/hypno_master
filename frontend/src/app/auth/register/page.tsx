import Link from "next/link";
import { UserPlus, Sparkles } from "lucide-react";

export default function RegisterPage() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 bg-[#fdfcf8] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(230,81,0,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,179,0,0.1),transparent_40%)]" />
        <div className="absolute inset-0 chinese-pattern opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white/90 border border-border rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-8 md:p-12 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Новый участник
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4 uppercase tracking-tight">
              Регистрация
            </h1>
            <p className="text-neutral-600 mb-10 max-w-md">
              Создайте аккаунт и получите доступ к программам оздоровления и тренировкам.
            </p>

            <form className="space-y-6">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                  Имя и фамилия
                </span>
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  className="mt-2 w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="mt-2 w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                  Пароль
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                  Повтор пароля
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <Link
                href="/account"
                className="group relative w-full px-10 py-4 bg-primary text-white font-black rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(230,81,0,0.35)] uppercase tracking-widest text-xs inline-flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Создать аккаунт
                </span>
                <div className="absolute inset-0 bg-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            </form>

            <div className="mt-8 text-sm">
              <Link
                href="/auth"
                className="text-primary font-semibold hover:text-secondary transition-colors"
              >
                Уже есть аккаунт? Войти
              </Link>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -inset-6 border border-primary/30 rounded-2xl rotate-2" />
            <div className="absolute -inset-10 border border-secondary/30 rounded-2xl -rotate-2" />
            <div className="relative bg-neutral-900 text-white rounded-2xl p-8 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.35)] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,179,0,0.15),transparent_55%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-secondary uppercase tracking-[0.2em] text-xs font-bold mb-6">
                  <Sparkles className="w-4 h-4" />
                  Что получите
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">
                  Доступ к практикам и наставникам
                </h2>
                <ul className="space-y-4 text-neutral-200">
                  {[
                    "Регистрация на занятия и встречи",
                    "Планы развития и подборки методик",
                    "Трекинг активности и личный дневник",
                    "Материалы для самостоятельной практики",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(255,179,0,0.7)]" />
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 text-xs uppercase tracking-[0.2em] text-white/60">
                  Прозрачная система целей и результатов
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
