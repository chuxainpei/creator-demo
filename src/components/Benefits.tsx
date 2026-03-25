import React from 'react';

const benefits = [
  {
    title: '更像真实产品，而不是单页 demo',
    description: '统一的卡片体系、边框语言、阴影节奏与版式层级，显著降低拼接感。',
  },
  {
    title: '信息更容易被扫描',
    description: '每个区块都围绕一个清晰问题展开，用户能快速理解产品能力与使用方式。',
  },
  {
    title: '更符合 2026 AI 产品审美',
    description: '中性色打底、AI 紫点缀、细腻光感与克制交互，减少噱头感与视觉噪音。',
  },
  {
    title: '保留功能同时提升可信度',
    description: '双模式切换、流式回答、来源展示等体验仍在，只是表达方式更专业。',
  },
];

const Benefits: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="section-heading mb-14">
          <div className="section-kicker">核心优势</div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            在保留原有能力的前提下，提升整体产品可信度
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            这次升级不是增加花哨特效，而是让视觉、文案、结构和交互都向成熟产品对齐。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => (
            <article key={benefit.title} className="panel-card p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                0{index + 1}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-950">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
