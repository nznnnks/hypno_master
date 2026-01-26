import Link from "next/link";
import { CreditCard, Lock, LogOut, User } from "lucide-react";

const transactions = [
  { id: "TR-2049", date: "12 янв 2026", amount: "2 900 ₽", status: "Оплачено" },
  { id: "TR-2041", date: "05 янв 2026", amount: "1 400 ₽", status: "Оплачено" },
  { id: "TR-2032", date: "28 дек 2025", amount: "4 500 ₽", status: "Возврат" },
];

export default function AccountPage() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 bg-[#fdfcf8] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(230,81,0,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(255,179,0,0.1),transparent_40%)]" />
        <div className="absolute inset-0 chinese-pattern opacity-25" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Личный кабинет
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight mb-4">
              Настройки аккаунта
            </h1>
            <p className="text-neutral-600 max-w-2xl">
              Управляйте профилем, паролем и историей оплат в одном месте.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary transition-colors shadow-lg shadow-black/10"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">
                  Данные аккаунта
                </h2>
              </div>
              <button className="text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors">
                Сохранить
              </button>
            </div>
            <form className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                  Имя
                </span>
                <input
                  type="text"
                  defaultValue="Иван"
                  className="mt-2 w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                  Фамилия
                </span>
                <input
                  type="text"
                  defaultValue="Иванов"
                  className="mt-2 w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                  Email
                </span>
                <input
                  type="email"
                  defaultValue="you@email.com"
                  className="mt-2 w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                  Телефон
                </span>
                <input
                  type="tel"
                  defaultValue="+7 900 000-00-00"
                  className="mt-2 w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                  Город
                </span>
                <input
                  type="text"
                  defaultValue="Москва"
                  className="mt-2 w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
            </form>
          </div>

          <div className="bg-neutral-900 text-white rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,179,0,0.15),transparent_55%)]" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white/10 text-secondary flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight">
                  Пароль
                </h2>
              </div>
              <form className="space-y-4">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                    Текущий пароль
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                    Новый пароль
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                    Повтор нового пароля
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
                  />
                </label>
                <button className="mt-2 w-full px-6 py-3 bg-secondary text-neutral-900 font-black uppercase tracking-widest text-xs rounded-sm hover:bg-primary hover:text-white transition-colors">
                  Обновить пароль
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">
              Транзакции
            </h2>
          </div>
          <div className="grid gap-4">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-neutral-100 rounded-xl p-4"
              >
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                    {txn.id}
                  </div>
                  <div className="text-neutral-900 font-semibold">{txn.date}</div>
                </div>
                <div className="text-sm font-bold uppercase tracking-widest text-neutral-700">
                  {txn.amount}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary">
                  {txn.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
