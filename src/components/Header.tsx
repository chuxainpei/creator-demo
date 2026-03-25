import React from 'react';

const Header: React.FC = () => {
  const navItems = [
    { label: '产品概览', href: '#overview' },
    { label: '适用场景', href: '#scenarios' },
    { label: '核心优势', href: '#features' },
    { label: '在线演示', href: '#demo' },
    { label: '常见问题', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/72 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label="回到首页">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-violet-600 text-sm font-semibold text-white shadow-[0_16px_32px_-18px_rgba(76,29,149,0.7)]">
            AI
          </div>
          <div>
            <div className="text-sm font-semibold tracking-[0.18em] text-slate-950">智升学·职规划</div>
            <div className="text-xs text-slate-500">AI-native planning assistant</div>
          </div>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-950"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#demo"
            className="hidden rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-violet-200 hover:text-violet-700 sm:inline-flex"
          >
            预览 Demo
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(15,23,42,0.8)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            立即体验
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
