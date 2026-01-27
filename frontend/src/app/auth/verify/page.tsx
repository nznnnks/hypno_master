"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { ShieldCheck } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

  const email = useMemo(() => (searchParams.get("email") ?? "").trim(), [searchParams]);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const normalized = code.replace(/\s+/g, "");
    if (!email) {
      setError("Missing email");
      return;
    }
    if (!/^\d{6}$/.test(normalized)) {
      setError("Введите 6-значный код");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: normalized }),
      });

      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok) {
        setError(data?.error ?? `HTTP ${res.status}`);
        return;
      }

      router.push("/auth");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function onResend() {
    setError(null);
    if (!email) {
      setError("Missing email");
      return;
    }

    setResending(true);
    try {
      const res = await fetch(`${API_BASE}/api/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok) {
        setError(data?.error ?? `HTTP ${res.status}`);
        return;
      }
    } catch {
      setError("Network error");
    } finally {
      setResending(false);
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
        <div className="max-w-2xl mx-auto bg-white/90 border border-border rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-8 md:p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Подтверждение входа
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4 uppercase tracking-tight">
            Проверьте email
          </h1>
          <p className="text-neutral-600 mb-10">
            Мы отправили код на{" "}
            <span className="font-semibold text-neutral-900">{email || "you@email.com"}</span>.
            Введите его ниже, чтобы завершить вход.
          </p>

          <form className="space-y-6" onSubmit={onSubmit}>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                Код подтверждения
              </span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Введите 6‑значный код"
                value={code}
                onChange={(e) => setCode(e.currentTarget.value)}
                className="mt-2 w-full rounded-sm border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 tracking-[0.3em] text-center"
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
              className="group relative w-full px-10 py-4 bg-primary text-white font-black rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(230,81,0,0.35)] uppercase tracking-widest text-xs inline-flex items-center justify-center disabled:opacity-60"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Подтвердить
              </span>
              <div className="absolute inset-0 bg-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={onResend}
              disabled={resending}
              className="text-neutral-500 hover:text-neutral-800 transition-colors disabled:opacity-60"
            >
              Отправить код повторно
            </button>
            <Link
              href="/auth"
              className="text-primary font-semibold hover:text-secondary transition-colors"
            >
              Изменить email
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}