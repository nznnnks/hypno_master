import Link from 'next/link';
import { Youtube, Send, LogIn } from 'lucide-react';

const socialLinks = [
  { name: 'ТГ', href: '#', icon: <Send className="w-5 h-5" /> },
  { name: 'Ютуб', href: '#', icon: <Youtube className="w-5 h-5" /> },
];

const menuItems = [
  { name: 'Главная', href: '/' },
  { name: 'О мастере', href: '/master' },
  { name: 'Карта сайта', href: '/sitemap' },
  { name: 'Гимнастика', href: '/gymnastics' },
  { name: 'Цигун', href: '/qigong' },
  { name: 'Исцеление', href: '/healing' },
  { name: 'Ясновидение', href: '/clairvoyance' },
  { name: 'Воздействие', href: '/influence' },
  { name: 'Гипноз', href: '/hypnosis' },
];

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              BM
            </div>
            <span className="font-bold text-xl hidden md:inline-block text-neutral-900 uppercase tracking-tighter">БЕЗ МИСТИКИ</span>
          </Link>

          <nav className="hidden xl:flex items-center space-x-5 text-xs font-semibold">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-secondary text-neutral-800 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-6">
            <div className="flex items-center space-x-1 md:space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 text-neutral-500 hover:text-secondary transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <Link 
              href="/auth" 
              className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary transition-colors shadow-lg shadow-black/5"
            >
              <LogIn className="w-4 h-4" />
              Войти
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
