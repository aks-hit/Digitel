'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, BarChart3, Bot, Home, LayoutDashboard, Zap } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/assessment', label: 'Assessment', icon: Activity },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/simulator', label: 'Simulator', icon: BarChart3 },
  { href: '/executive', label: 'Executive', icon: Zap },
  { href: '/chat', label: 'AI Chat', icon: Bot },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3 bg-slate-950/80 backdrop-blur-lg border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">
            <span className="text-white">DigiTel</span>{' '}
            <span className="gradient-text">Nexus AI</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-1">
          {NAV_ITEMS.slice(0, 4).map(({ href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`p-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
