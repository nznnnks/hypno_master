import Link from "next/link";
import { Award, BookOpen, Mail, MapPin, Phone } from "lucide-react";

const facts = [
  { label: "Опыт практики", value: "19 лет" },
  { label: "Групп проведено", value: "320+" },
  { label: "Учеников", value: "2 400+" },
];

const certificates = [
  {
    title: "Нейрофизиология человека",
    org: "Международная академия науки",
    year: "2014",
  },
  {
    title: "Терапевтические практики дыхания",
    org: "Школа телесной терапии",
    year: "2017",
  },
  {
    title: "Преподаватель цигун",
    org: "Ассоциация восточных практик",
    year: "2020",
  },
];

export default function MasterPage() {
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
              О мастере
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-neutral-900 uppercase tracking-tight mb-6 leading-[0.9]">
              Мастер Ци
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] animate-gradient-text">
                Практики без мистики
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 max-w-xl border-l-2 border-primary pl-6">
              Биолог и нейрофизиолог. Более 15 лет обучает осознанным практикам, где важны дисциплина, точность и результат.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-white/90 border border-border rounded-2xl p-4 text-center shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
                >
                  <div className="text-2xl font-black text-neutral-900">{fact.value}</div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">
                    {fact.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 border-2 border-primary/30 rounded-2xl rotate-2" />
            <div className="absolute -inset-10 border-2 border-secondary/30 rounded-2xl -rotate-2" />
            <div className="relative rounded-2xl overflow-hidden bg-neutral-900 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <img
                src="/photo_2026-01-23_00-16-25.png"
                alt="Мастер Ци"
                className="w-full h-full object-cover object-top opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 flex flex-col justify-end">
                <div className="text-white/70 text-xs uppercase tracking-[0.2em] mb-3">
                  Профиль
                </div>
                <div className="text-2xl font-black text-white uppercase tracking-tight">
                  Биолог, нейрофизиолог, мастер цигун
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">
                Биография и опыт
              </h2>
            </div>
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                Системный подход к практике сформировался на стыке науки и традиций. В основе обучения
                — наблюдение за телом, дыханием и вниманием, а не мистические объяснения.
              </p>
              <p>
                За годы преподавания сформирован авторский метод: плавные техники, контроль прогресса,
                регулярность и ясные инструменты для самостоятельной практики.
              </p>
              <p>
                Программы адаптируются под уровень ученика — от мягкого старта до углубленных курсов
                с ежедневными практиками и персональными рекомендациями.
              </p>
            </div>
          </div>

          <div className="bg-neutral-900 text-white rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,179,0,0.2),transparent_55%)]" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white/10 text-secondary flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight">
                  Факты и достижения
                </h2>
              </div>
              <ul className="space-y-4 text-white/85 text-sm">
                {[
                  "Проводит регулярные онлайн-группы и очные интенсивы.",
                  "Автор программ по дыхательным практикам и восстановлению.",
                  "Работает с учениками из 12 стран.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(255,179,0,0.7)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/directions"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-secondary text-neutral-900 font-black uppercase tracking-widest text-xs rounded-sm hover:bg-primary hover:text-white transition-colors"
              >
                Смотреть направления
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">
              Сертификаты
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {certificates.map((cert) => (
              <div
                key={cert.title}
                className="border border-neutral-100 rounded-xl p-4 bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              >
                <div className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                  {cert.year}
                </div>
                <div className="font-semibold text-neutral-900">{cert.title}</div>
                <div className="text-sm text-neutral-500">{cert.org}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="bg-white/90 border border-border rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">
                Контакты
              </h2>
            </div>
            <div className="space-y-4 text-neutral-700">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                master@bezmistiki.ru
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                +7 (900) 000-00-00
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                Москва, ул. Примерная, 12
              </div>
            </div>
          </div>
          <div className="bg-neutral-900 text-white rounded-2xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,179,0,0.2),transparent_55%)]" />
            <div className="relative">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
                Связаться для консультации
              </h2>
              <p className="text-white/80 mb-6">
                Оставьте заявку и получите персональную рекомендацию по направлению и уровню.
              </p>
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-neutral-900 font-black uppercase tracking-widest text-xs rounded-sm hover:bg-primary hover:text-white transition-colors"
              >
                Записаться
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
