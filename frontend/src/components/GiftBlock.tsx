import Link from "next/link";
import { Gift, ArrowUpRight } from "lucide-react";

export default function GiftBlock() {
  return (
    <section className="py-24 bg-[#fdfcf8] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(230,81,0,0.08),transparent_50%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="bg-neutral-900 text-white rounded-3xl p-10 shadow-[0_25px_70px_rgba(0,0,0,0.35)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,179,0,0.2),transparent_55%)]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-5">
                <Gift className="w-4 h-4" />
                Подарок
              </div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                Получите книгу в подарок
              </h3>
              <p className="text-white/80 mb-6">
                «Снимаем боль. Точечный массаж и самомассаж» — практические методы, которые можно применять сразу.
              </p>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-neutral-900 font-black uppercase tracking-widest text-xs rounded-sm hover:bg-primary hover:text-white transition-colors"
              >
                Получить подарок
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="bg-white/90 border border-border rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
              Альтернатива подарку
            </h4>
            <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-4">
              Бесплатные вводные материалы
            </h3>
            <p className="text-neutral-600 mb-6">
              Узнайте, что общего между всеми медитативными процессами и как они влияют на нервную систему.
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 text-neutral-700 text-xs font-bold uppercase tracking-widest rounded-sm hover:border-primary/40 hover:text-primary transition-colors"
            >
              Смотреть уроки
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
