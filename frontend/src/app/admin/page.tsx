import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Mail,
  Users,
  Shield,
  Search,
  RefreshCw,
  KeyRound,
  Send,
} from "lucide-react";

const stats = [
  { label: "Новые регистрации", value: "24", icon: <Users className="w-5 h-5" /> },
  { label: "Ожидают код", value: "7", icon: <Mail className="w-5 h-5" /> },
  { label: "Подтверждено", value: "112", icon: <CheckCircle2 className="w-5 h-5" /> },
];

const recent = [
  { email: "user1@mail.com", status: "Код отправлен", time: "2 мин назад", verified: false },
  { email: "user2@mail.com", status: "Подтверждено", time: "12 мин назад", verified: true },
  { email: "user3@mail.com", status: "Повторная отправка", time: "25 мин назад", verified: false },
  { email: "user4@mail.com", status: "Код отправлен", time: "38 мин назад", verified: false },
];

export default function AdminPage() {
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
              Админка
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight mb-4">
              Панель управления
            </h1>
            <p className="text-neutral-600 max-w-2xl">
              Лёгкий обзор регистраций, подтверждений и активности пользователей.
            </p>
          </div>
          <Link
            href="/account"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary transition-colors shadow-lg shadow-black/10"
          >
            <Shield className="w-4 h-4" />
            Перейти в кабинет
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/90 border border-border rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  {stat.label}
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-6 text-4xl font-black text-neutral-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
          <div className="bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">
                Пользователи и заявки
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Поиск по email"
                    className="pl-9 pr-4 py-2 rounded-sm border border-neutral-200 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-200 text-xs font-bold uppercase tracking-widest rounded-sm hover:border-primary/40 hover:text-primary transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Обновить
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {recent.map((item) => (
                <div
                  key={item.email}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-neutral-100 rounded-xl p-4"
                >
                  <div>
                    <div className="font-semibold text-neutral-900">{item.email}</div>
                    <div className="text-sm text-neutral-500">{item.status}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                        item.verified
                          ? "bg-secondary/20 text-secondary"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {item.verified ? "Подтвержден" : "Не подтвержден"}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {item.time}
                    </div>
                    <button className="px-4 py-2 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary transition-colors">
                      Открыть
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

            <div className="space-y-6">
            <div className="bg-white/90 border border-border rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tight">
                  Регистрация (отправка кода)
                </h3>
              </div>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email пользователя"
                  className="w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-sm hover:bg-neutral-900 transition-colors">
                  <Send className="w-4 h-4" />
                  POST /api/register
                </button>
              </form>
            </div>

            <div className="bg-white/90 border border-border rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tight">
                  Подтверждение email
                </h3>
              </div>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email пользователя"
                  className="w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <input
                  type="text"
                  placeholder="Код подтверждения (6 цифр)"
                  className="w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 text-white text-xs font-black uppercase tracking-widest rounded-sm hover:bg-primary transition-colors">
                  POST /api/verify-email
                </button>
              </form>
            </div>

            <div className="bg-white/90 border border-border rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tight">
                  Повторная отправка кода
                </h3>
              </div>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email пользователя"
                  className="w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-sm hover:bg-neutral-900 transition-colors">
                  POST /api/resend-verification
                </button>
              </form>
            </div>

            <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,179,0,0.2),transparent_55%)]" />
              <div className="relative">
                <h3 className="text-lg font-black uppercase tracking-tight mb-3">
                  API маршруты
                </h3>
                <div className="space-y-2 text-xs uppercase tracking-[0.2em] text-white/70">
                  <div>POST /api/register</div>
                  <div>POST /api/verify-email</div>
                  <div>POST /api/resend-verification</div>
                  <div>POST /api/request-password-change</div>
                  <div>POST /api/confirm-password-change</div>
                  <div>POST /api/resend-password-change</div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 border border-border rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tight">
                  Поля пользователя
                </h3>
              </div>
              <div className="grid gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
                <div className="flex items-center justify-between border border-neutral-100 rounded-lg px-3 py-2">
                  <span>name</span>
                  <span>TEXT</span>
                </div>
                <div className="flex items-center justify-between border border-neutral-100 rounded-lg px-3 py-2">
                  <span>email</span>
                  <span>TEXT</span>
                </div>
                <div className="flex items-center justify-between border border-neutral-100 rounded-lg px-3 py-2">
                  <span>email_verified</span>
                  <span>BOOLEAN</span>
                </div>
                <div className="flex items-center justify-between border border-neutral-100 rounded-lg px-3 py-2">
                  <span>created_at</span>
                  <span>timestamp</span>
                </div>
                <div className="flex items-center justify-between border border-neutral-100 rounded-lg px-3 py-2">
                  <span>password_hash</span>
                  <span>TEXT</span>
                </div>
                <div className="flex items-center justify-between border border-neutral-100 rounded-lg px-3 py-2">
                  <span>password_salt</span>
                  <span>TEXT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
