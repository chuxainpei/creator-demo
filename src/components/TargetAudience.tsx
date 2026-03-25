import React from 'react';

const audience = [
  {
    title: '准备升学的学生',
    description: '需要判断项目匹配度、申请节奏与背景补强路径，希望更快建立完整申请策略。',
    accent: 'bg-sky-100 text-sky-700',
  },
  {
    title: '进入求职市场的人',
    description: '需要把岗位选择、简历表达、作品证明和投递节奏串成一条可执行路线。',
    accent: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: '正在转型的从业者',
    description: '需要从新方向要求、能力差距到行动计划建立更稳妥的转向框架。',
    accent: 'bg-violet-100 text-violet-700',
  },
];

const TargetAudience: React.FC = () => {
  return (
    <section id="overview" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="section-heading mb-14">
          <div className="section-kicker">适用人群</div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            为不同人生阶段提供同样清晰的 AI 规划体验
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            首页不再泛泛而谈，而是直接回答：这个产品适合谁、能解决什么、为什么值得继续体验。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {audience.map((item, index) => (
            <article key={item.title} className="panel-card p-7">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold ${item.accent}`}>
                0{index + 1}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
