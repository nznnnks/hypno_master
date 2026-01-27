
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { LogIn, Sparkles } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const email =
      (form.querySelector('input[type="email"]') as HTMLInputElement | null)?.value.trim() ??
      "";
    const password =
      (form.querySelector('input[type="password"]') as HTMLInputElement | null)?.value ?? "";

    if (!email || !password) {
      setError("Missing fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok) {
        if (data?.error === "email_not_verified") {
          router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
          return;
        }
        setError(data?.error ?? `HTTP ${res.status}`);
        return;
      }

      try {
        localStorage.setItem("auth_user", JSON.stringify(data?.user ?? null));
      } catch {
        // ignore storage failures (e.g. private mode)
      }
      router.push("/account");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen pt-28 pb-20 bg-[#fdfcf8] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(230,81,0,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,179,0,0.1),transparent_40%)]" />
        <div className="absolute inset-0 chinese-pattern opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white/90 border border-border rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Личный кабинет
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4 uppercase tracking-tight">
              Вход
            </h1>
            <p className="text-neutral-600 mb-10 max-w-md">
              Войдите, чтобы получить доступ к курсам, записям и персональным рекомендациям.
            </p>

            <form className="space-y-6" onSubmit={onSubmit}>
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

              {error ? (
                <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full px-10 py-4 bg-primary text-white font-black rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(230,81,0,0.35)] uppercase tracking-widest text-xs inline-flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Войти
                </span>
                <div className="absolute inset-0 bg-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
            </form>

            <div className="mt-8 flex items-center justify-between text-sm">
              <Link
                href="/auth/register"
                className="text-primary font-semibold hover:text-secondary transition-colors"
              >
                Нет аккаунта? Регистрация
              </Link>
              <button className="text-neutral-500 hover:text-neutral-800 transition-colors">
                Забыли пароль?
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 border border-primary/30 rounded-2xl rotate-2" />
            <div className="absolute -inset-10 border border-secondary/30 rounded-2xl -rotate-2" />
            <div className="relative bg-neutral-900 text-white rounded-2xl p-8 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.35)] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,179,0,0.15),transparent_55%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-secondary uppercase tracking-[0.2em] text-xs font-bold mb-6">
                  <Sparkles className="w-4 h-4" />
                  Почему стоит войти
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">
                  Контроль прогресса без мистики
                </h2>
                <ul className="space-y-4 text-neutral-200">
                  {[
                    "Доступ к расписанию занятий и клубным событиям",
                    "Персональные планы развития и трекер привычек",
                    "Записи мастер-классов и материалы курса",
                    "Поддержка наставника и закрытого сообщества",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(255,179,0,0.7)]" />
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 text-xs uppercase tracking-[0.2em] text-white/60">
                  Система поддерживает дисциплину и результат
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
