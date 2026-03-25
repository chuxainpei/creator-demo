import React from 'react';
import { ChatProvider } from './hooks/useChat';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TargetAudience from './components/TargetAudience';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import ChatInterface from './components/ChatInterface';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <ChatProvider>
      <div className="relative min-h-screen overflow-hidden bg-[#f5f7fb] text-slate-900">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.14),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-24 h-[1px] bg-gradient-to-r from-transparent via-violet-200/80 to-transparent" />

        <div className="relative flex min-h-screen flex-col">
          <Header />

          <main className="flex-grow">
            <HeroSection />
            <TargetAudience />
            <HowItWorks />
            <UseCases />
            <Benefits />

            <section id="demo" className="relative py-20 sm:py-24">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_60%)]" />
              <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700 shadow-sm backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-violet-500" />
                    Live product demo
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                    在线体验 2026 版双模式 AI 助手
                  </h2>
                  <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                    不是静态截图，而是可切换模式、可流式输出、可展示回答结构的真实产品预览。
                  </p>
                </div>
                <div className="flex justify-center">
                  <ChatInterface />
                </div>
              </div>
            </section>

            <FAQ />
          </main>

          <Footer />
        </div>
      </div>
    </ChatProvider>
  );
};

export default App;
