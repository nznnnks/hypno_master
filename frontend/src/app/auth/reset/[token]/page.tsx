import Link from "next/link";
import { KeyRound } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 bg-[#fdfcf8] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(230,81,0,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,179,0,0.1),transparent_40%)]" />
        <div className="absolute inset-0 chinese-pattern opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto bg-white/90 border border-border rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-8 md:p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Новый пароль
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4 uppercase tracking-tight">
            Введите новый пароль
          </h1>
          <p className="text-neutral-600 mb-10">
            Ссылка уникальная и действует ограниченное время. Создайте новый пароль для входа.
          </p>

          <form className="space-y-6">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                Новый пароль
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                Повтор нового пароля
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <Link
              href="/auth"
              className="group relative w-full px-10 py-4 bg-primary text-white font-black rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(230,81,0,0.35)] uppercase tracking-widest text-xs inline-flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <KeyRound className="w-4 h-4" />
                Сохранить пароль
              </span>
              <div className="absolute inset-0 bg-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
