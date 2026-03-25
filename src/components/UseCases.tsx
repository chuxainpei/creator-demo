import React from 'react';

const cases = [
  {
    title: '升学规划模式',
    description: '从项目选择到申请节奏，帮助用户建立更完整的 2026 申请季准备框架。',
    scenarios: ['目标院校与项目筛选', '申请时间线拆解', '文书 / 科研 / 推荐信准备', '背景短板补强建议'],
  },
  {
    title: '就业指导模式',
    description: '围绕岗位匹配、简历表达与投递节奏，让求职执行更具体、更成体系。',
    scenarios: ['岗位方向收敛', '简历与作品集优化', '面试准备与表达策略', '求职节奏与行动计划'],
  },
];

const UseCases: React.FC = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="section-heading mb-14">
          <div className="section-kicker">应用场景</div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            同一套交互壳体，承载两条截然不同的规划路径
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            通过模式切换改变回答重心，让 demo 更接近真实产品能力，而不是简单替换文案。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {cases.map((caseItem, index) => (
            <article
              key={caseItem.title}
              className={`panel-card p-7 ${
                index === 0
                  ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(238,242,255,0.88))]'
                  : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,243,255,0.92))]'
              }`}
            >
              <div className="inline-flex rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {index === 0 ? 'Postgraduate' : 'Employment'}
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">{caseItem.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{caseItem.description}</p>

              <ul className="mt-6 space-y-3">
                {caseItem.scenarios.map((scenario) => (
                  <li key={scenario} className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-violet-100 text-violet-700">
                      <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                        <path d="M3.25 8.25L6.5 11.5L12.75 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm text-slate-700">{scenario}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
