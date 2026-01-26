import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";

const sections = [
  {
    title: "Основные",
    links: [
      { label: "Главная", href: "/" },
      { label: "О мастере", href: "/master" },
      { label: "Карта сайта", href: "/sitemap" },
      { label: "Направления", href: "/directions" },
    ],
  },
  {
    title: "Направления",
    links: [
      { label: "Цигун", href: "/qigong" },
      { label: "Ясновидение", href: "/clairvoyance" },
      { label: "Дистанционное воздействие", href: "/influence" },
      { label: "Гипноз", href: "/hypnosis" },
      { label: "Исцеление", href: "/healing" },
      { label: "Гимнастика", href: "/gymnastics" },
      { label: "Йога", href: "/yoga" },
      { label: "Психотерапия", href: "/psychotherapy" },
    ],
  },
  {
    title: "Личный кабинет",
    links: [
      { label: "Вход", href: "/auth" },
      { label: "Регистрация", href: "/auth/register" },
      { label: "Подтверждение входа", href: "/auth/verify" },
      { label: "Личный кабинет", href: "/account" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 bg-[#fdfcf8] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(230,81,0,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(255,179,0,0.1),transparent_40%)]" />
        <div className="absolute inset-0 chinese-pattern opacity-25" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Карта сайта
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-neutral-900 uppercase tracking-tight mb-6 leading-[0.95]">
            Все разделы
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] animate-gradient-text">
              в одном месте
            </span>
          </h1>
          <p className="text-lg text-neutral-700 max-w-xl border-l-2 border-primary pl-6">
            Быстрый доступ к каждому разделу и направлению обучения.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white/90 border border-border rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-neutral-900 uppercase tracking-tight">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between gap-3 text-neutral-700 hover:text-primary transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
