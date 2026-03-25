import React from 'react';

const metrics = [
  { value: '2', label: '规划模式', detail: '升学 / 就业自由切换' },
  { value: '2026', label: '年度版本', detail: '围绕最新申请季与求职季表达' },
  { value: 'Live', label: '交互状态', detail: '支持流式回答与来源展示' },
];

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-14 sm:pb-24 lg:pb-28 lg:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] hero-grid opacity-70" />
      <div className="section-shell relative">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="section-kicker">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              2026 Product Refresh
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl">
              把升学规划与求职决策，收敛进一个更专业的 AI 界面里。
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              面向 2026 申请季与求职季的双模式 AI 助手。用更克制的视觉、更清晰的结构和更真实的交互预览，展示产品如何帮助用户完成判断、规划与执行。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_-20px_rgba(15,23,42,0.85)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                进入交互演示
              </a>
              <a
                href="#overview"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-violet-200 hover:text-violet-700"
              >
                查看产品结构
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {metrics.map((item) => (
                <div key={item.label} className="panel-card p-5">
                  <div className="text-2xl font-semibold tracking-tight text-slate-950">{item.value}</div>
                  <div className="mt-1 text-sm font-medium text-slate-700">{item.label}</div>
                  <div className="mt-2 text-xs leading-5 text-slate-500">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="panel-card relative w-full max-w-xl overflow-hidden p-6 sm:p-7">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
              <div className="rounded-[28px] border border-slate-200/80 bg-slate-950 p-5 text-white shadow-[0_30px_60px_-36px_rgba(15,23,42,0.8)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">Product preview</div>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight">一个更像成熟 AI 产品的首页</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                    Live
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/45">For students</div>
                    <div className="mt-3 text-lg font-semibold">项目筛选 + 时间线规划</div>
                    <p className="mt-2 text-sm leading-6 text-white/65">帮助用户从目标院校、研究方向到材料准备建立清晰路径。</p>
                  </div>
                  <div className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-indigo-400/10 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-violet-200">For job seekers</div>
                    <div className="mt-3 text-lg font-semibold">岗位定位 + 表达策略</div>
                    <p className="mt-2 text-sm leading-6 text-white/70">围绕作品集、简历与投递节奏，输出更可执行的求职方案。</p>
                  </div>
                </div>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-white/45">Design notes</div>
                      <div className="mt-2 text-sm leading-6 text-white/75">中性色基底、细线框、轻量阴影与 AI 紫色信号，减少 demo 感，强化专业产品感。</div>
                    </div>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-400/15 text-violet-200">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                        <path d="M12 3L14.4 8.1L20 9L16 13L17 19L12 16L7 19L8 13L4 9L9.6 8.1L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
