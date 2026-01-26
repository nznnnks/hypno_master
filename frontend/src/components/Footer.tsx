import Link from 'next/link';
import { Youtube, Send, Video, Share2 } from 'lucide-react';

const socialLinks = [
  { name: 'ВК', href: '#', icon: <Share2 className="w-5 h-5" /> },
  { name: 'ТГ', href: '#', icon: <Send className="w-5 h-5" /> },
  { name: 'Ок', href: '#', icon: <Share2 className="w-5 h-5" /> },
  { name: 'Тик-Ток', href: '#', icon: <Video className="w-5 h-5" /> },
  { name: 'Ютуб', href: '#', icon: <Youtube className="w-5 h-5" /> },
  { name: 'Рутюб', href: '#', icon: <Video className="w-5 h-5" /> },
];

const footerLinks = [
  { name: 'Главная', href: '/' },
  { name: 'Лечебная гимнастика', href: '/gymnastics' },
  { name: 'Цигун', href: '/qigong' },
  { name: 'Йога', href: '/yoga' },
  { name: 'Психотерапия', href: '/psychotherapy' },
  { name: 'Способы исцеления', href: '/healing' },
  { name: 'Ясновидение', href: '/clairvoyance' },
  { name: 'Дистанционное воздействие', href: '/influence' },
  { name: 'Гипноз', href: '/hypnosis' },
  { name: 'Полезно знать', href: '/useful' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-accent text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                BM
              </div>
              <span className="font-bold text-lg uppercase tracking-tighter">БЕЗ МИСТИКИ</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Центр оздоровления через движение и осознанность. Мы исключаем мистику и фокусируемся на реальных механизмах работы тела.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-secondary">Навигация</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-secondary text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-secondary">Мы в соцсетях</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Без Мистики. Все права защищены.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
