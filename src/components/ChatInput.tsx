import React, { KeyboardEvent, useCallback, useRef, useState } from 'react';
import { useChat } from '../hooks/useChat';

interface ChatInputProps {
  onSend: (message: string) => Promise<void>;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const { mode } = useChat();
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submitMessage = useCallback(async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || disabled) {
      return;
    }

    await onSend(trimmed);
    setInputValue('');
  }, [disabled, inputValue, onSend]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await submitMessage();
    },
    [submitMessage],
  );

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        await submitMessage();
      }
    },
    [submitMessage],
  );

  React.useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
  }, [inputValue]);

  const placeholder =
    mode === 'postgraduate'
      ? '可以问我目标院校、申请时间线或研究方向匹配……'
      : '可以问我岗位方向、简历策略或求职规划……';

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[68px] max-h-36 w-full resize-none rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4 pr-14 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-70"
          rows={1}
          disabled={disabled}
          aria-label="输入消息"
        />

        <button
          type="submit"
          disabled={!inputValue.trim() || disabled}
          className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_14px_24px_-14px_rgba(99,102,241,0.9)] transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          aria-label="发送消息"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5" aria-hidden="true">
            <path d="M3 9.5L16.25 3.5L12.25 16.5L9.5 10.5L3 9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M9.25 10.25L16 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
