import React, { useState } from 'react';

const faqs = [
  {
    question: '这个服务适合哪些人？',
    answer:
      '适合正在准备升学、进入求职市场，或希望转换职业方向的人。核心价值不在于替代人工判断，而在于帮助用户更快建立清晰的规划框架。',
  },
  {
    question: '双模式切换的意义是什么？',
    answer:
      '升学与求职虽然都属于规划问题，但信息结构完全不同。模式切换让回答在项目匹配、时间线、作品集、岗位表达等维度上更聚焦，而不是给出泛化建议。',
  },
  {
    question: '2026 版升级了什么？',
    answer:
      '重点升级了首页的视觉语言、信息层级与 demo 呈现方式，让产品更接近真实 AI SaaS，而不只是一个简单的功能展示页。',
  },
  {
    question: '现在就能直接体验吗？',
    answer:
      '可以。首页内置了在线演示区域，用户可以直接在不同模式下发起提问，查看流式回答和参考来源的展示方式。',
  },
  {
    question: 'AI 建议是否可以直接照做？',
    answer:
      '更合理的方式是把它当作结构化辅助工具：先帮助你厘清方向和行动项，再结合个人背景、项目要求与外部信息做最终决策。',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="section-heading mb-14">
          <div className="section-kicker">常见问题</div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            把关键疑问提前回答掉，降低首次体验门槛
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            FAQ 不再只是填空区块，而是继续强化产品定位、模式价值和使用预期。
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="panel-card overflow-hidden">
                <button
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base font-semibold text-slate-950 sm:text-lg">{faq.question}</h3>
                  <span
                    className={`inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-6 pb-6 pt-4 sm:px-7">
                    <p className="text-sm leading-7 text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
