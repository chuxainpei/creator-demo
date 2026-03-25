import React from 'react';

const steps = [
  {
    step: '01',
    title: '选择目标模式',
    description: '在升学规划与就业指导之间切换，让问题上下文与回答逻辑更贴近用户当前任务。',
  },
  {
    step: '02',
    title: '输入背景与约束',
    description: '围绕目标、时间、经历和限制条件补充信息，让 AI 能够给出更具体的判断。',
  },
  {
    step: '03',
    title: '获得可执行方案',
    description: '输出重点项目、时间节点、行动建议与参考来源，减少空泛回答带来的不确定性。',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="scenarios" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="section-heading mb-14">
          <div className="section-kicker">工作方式</div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            三步进入规划状态，而不是被复杂流程打断
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            用更短的路径进入真正有价值的对话：明确模式、补充上下文、直接得到结构化建议。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <article key={step.step} className="panel-card p-7">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">Step {step.step}</div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{step.description}</p>
              <div className="mt-8 h-px bg-gradient-to-r from-violet-200 via-slate-200 to-transparent" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
