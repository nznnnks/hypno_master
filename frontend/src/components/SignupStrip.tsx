import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SignupStrip() {
  return (
    <section className="py-12 bg-neutral-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2">
              Готовы начать?
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              Запишитесь на консультацию
            </h3>
          </div>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-sm hover:bg-white hover:text-neutral-900 transition-colors"
          >
            Записаться
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
