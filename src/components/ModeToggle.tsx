import React from 'react';
import { useChat } from '../hooks/useChat';
import { ChatMode } from '../types';

const options: Array<{
  value: ChatMode;
  label: string;
  description: string;
}> = [
  {
    value: 'postgraduate',
    label: '升学',
    description: '院校 · 时间线 · 研究匹配',
  },
  {
    value: 'employment',
    label: '就业',
    description: '岗位 · 作品集 · 求职策略',
  },
];

const ModeToggle: React.FC = () => {
  const { mode, setMode } = useChat();

  return (
    <div className="space-y-3">
      <div className="inline-flex w-full rounded-[24px] bg-white p-1.5 shadow-sm ring-1 ring-slate-200">
        {options.map((option) => {
          const active = mode === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setMode(option.value)}
              aria-pressed={active}
              className={`flex-1 rounded-[20px] px-4 py-3 text-left transition-all duration-200 ${
                active
                  ? 'bg-gradient-to-r from-slate-900 to-violet-700 text-white shadow-[0_14px_30px_-18px_rgba(67,56,202,0.7)]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-semibold ${
                    active ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {option.value === 'postgraduate' ? '升' : '职'}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{option.label}</span>
                  <span className={`mt-0.5 block text-xs ${active ? 'text-white/80' : 'text-slate-400'}`}>
                    {option.description}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-sm text-slate-500">
        {mode === 'postgraduate'
          ? '侧重院校匹配、申请节奏与整体准备度。'
          : '侧重岗位定位、表达策略与求职执行。'}
      </p>
    </div>
  );
};

export default ModeToggle;
