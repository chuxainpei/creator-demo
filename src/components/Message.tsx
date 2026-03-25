import React from 'react';
import { Message } from '../types';

interface MessageProps {
  message: Message;
  isStreaming?: boolean;
}

const MessageComponent: React.FC<MessageProps> = ({ message, isStreaming = false }) => {
  const formatTimestamp = (date: Date) =>
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[92%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
        <div className="mb-1 flex items-center gap-2 px-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {message.role === 'user' ? '你' : 'AI 助手'}
          </span>
          <span className="text-[11px] text-slate-400">{formatTimestamp(message.timestamp)}</span>
        </div>

        <div
          className={`rounded-[24px] px-4 py-3 shadow-sm ${
            message.role === 'user'
              ? 'bg-gradient-to-r from-slate-900 to-violet-700 text-white'
              : 'border border-slate-200 bg-slate-50 text-slate-900'
          }`}
        >
          <div className="whitespace-pre-wrap text-sm leading-7">
            {message.content}
            {isStreaming && (
              <span className="ml-1 inline-block h-5 w-[3px] animate-pulse rounded-full bg-violet-400 align-middle" />
            )}
          </div>

          {message.role === 'assistant' && !isStreaming && !!message.sources?.length && (
            <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">参考来源</div>
              {message.sources.map((source) => (
                <a
                  key={`${source.title}-${source.url}`}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-white bg-white px-3 py-3 transition-colors duration-200 hover:border-violet-200 hover:bg-violet-50/40"
                >
                  <div className="text-sm font-semibold text-slate-900">{source.title}</div>
                  {source.snippet && <p className="mt-1 text-xs leading-5 text-slate-500">{source.snippet}</p>}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
