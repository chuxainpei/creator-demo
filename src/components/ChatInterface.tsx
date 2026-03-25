import React, { useEffect, useMemo, useRef } from 'react';
import { useChat } from '../hooks/useChat';
import MessageComponent from './Message';
import ChatInput from './ChatInput';
import ModeToggle from './ModeToggle';
import { ChatMode, Message } from '../types';

const quickPromptMap: Record<ChatMode, string[]> = {
  postgraduate: [
    '帮我规划 2026 年硕士申请时间线。',
    '筛选研究生项目时，最关键的判断指标有哪些？',
    '我该如何平衡 GPA、科研经历和文书策略？',
  ],
  employment: [
    '帮我制定 AI 产品实习的求职准备方案。',
    '初级开发者应该怎样安排 2026 求职节奏？',
    '怎样优化我的简历和作品集，更适合产品岗位？',
  ],
};

const modeMeta: Record<ChatMode, { label: string; description: string; footnote: string }> = {
  postgraduate: {
    label: '升学规划模式',
    description: '聚焦项目匹配、申请准备度、时间线与整体策略。',
    footnote: '基于升学规划、项目定位与关键节点安排的指导逻辑。',
  },
  employment: {
    label: '就业指导模式',
    description: '聚焦岗位方向、作品集表达与求职执行方案。',
    footnote: '基于岗位匹配、市场化表达与求职节奏设计的建议逻辑。',
  },
};

const ChatInterface: React.FC = () => {
  const { messages, isLoading, sendMessage, mode } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = useMemo(() => quickPromptMap[mode], [mode]);
  const activeMode = modeMeta[mode];
  const lastMessage = messages[messages.length - 1];
  const isStreamingLastMessage =
    !!lastMessage && lastMessage.role === 'assistant' && !lastMessage.sources;
  const showTypingIndicator = isLoading && (!lastMessage || lastMessage.role === 'user');

  return (
    <section
      aria-label="互动演示"
      className="panel-card relative w-full max-w-4xl overflow-hidden p-5 sm:p-6"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />

      <div className="flex flex-col gap-5 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </div>
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
              实时演示
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">升学与就业指导助手</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            一个带双模式切换、流式输出与来源展示的产品级交互预览。
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-right">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">状态</div>
          <div className="mt-1 flex items-center justify-end gap-2 text-sm text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            可演示
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[28px] border border-slate-200 bg-slate-50/90 p-4 sm:p-5">
        <ModeToggle />

        <div className="mt-5 flex min-h-[480px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-inner">
          <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">{activeMode.label}</div>
                <p className="text-sm text-slate-500">{activeMode.description}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                <span className="h-2 w-2 rounded-full bg-violet-500" />
                已启用流式预览
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="rounded-[24px] border border-dashed border-violet-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-violet-700">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                        <path d="M4 12C4 8.13401 7.13401 5 11 5H13C16.866 5 20 8.13401 20 12C20 15.866 16.866 19 13 19H11C7.13401 19 4 15.866 4 12Z" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M9 12H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M12 9V15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                    对话预览
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950">先从一个示例问题开始</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                    用下面的引导问题快速进入演示，方便展示这个助手在不同目标场景下的回答方式。
                  </p>
                </div>

                <div className="space-y-3">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      disabled={isLoading}
                      className="group flex w-full items-start justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition-all duration-200 hover:border-violet-200 hover:bg-violet-50/40 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span>
                        <span className="block text-sm font-medium text-slate-900">{prompt}</span>
                        <span className="mt-1 block text-xs text-slate-500">点击即可快速填充一条更真实的演示提问。</span>
                      </span>
                      <span className="ml-4 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors duration-200 group-hover:bg-violet-100 group-hover:text-violet-600">
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                          <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message: Message) => (
                  <MessageComponent
                    key={message.id}
                    message={message}
                    isStreaming={isStreamingLastMessage && message.id === lastMessage?.id}
                  />
                ))}

                {showTypingIndicator && (
                  <div className="flex justify-start">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: '0.12s' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: '0.24s' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-white px-4 py-4 sm:px-5">
            <ChatInput onSend={sendMessage} disabled={isLoading} />
            <div className="mt-3 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>{activeMode.footnote}</span>
              <span className="font-medium text-slate-400">产品级交互预览</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
