import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 py-14 backdrop-blur">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-violet-600 text-sm font-semibold text-white shadow-[0_18px_32px_-18px_rgba(76,29,149,0.7)]">
                AI
              </div>
              <div>
                <div className="font-semibold text-slate-950">智升学·职规划</div>
                <div className="text-sm text-slate-500">AI-native planning assistant</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
              用更清晰的结构与更克制的界面，承载升学规划与职业决策这两类高价值对话。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Sections</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href="#overview" className="transition-colors hover:text-slate-950">产品概览</a></li>
              <li><a href="#scenarios" className="transition-colors hover:text-slate-950">使用方式</a></li>
              <li><a href="#features" className="transition-colors hover:text-slate-950">核心优势</a></li>
              <li><a href="#demo" className="transition-colors hover:text-slate-950">在线演示</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Notes</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>2026 年度前端设计升级</li>
              <li>双模式交互演示保留</li>
              <li>未暴露个人联系方式</li>
              <li>构建可在本地继续预览</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 智升学·职规划. All rights reserved.</p>
          <p>Designed for a calmer, more professional AI product presentation.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
