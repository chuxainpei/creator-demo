import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatContextType, ChatMode, Message, Source } from '../types';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const buildSources = (mode: ChatMode): Source[] => {
  if (mode === 'postgraduate') {
    return [
      {
        title: '研究生申请规划框架',
        url: 'https://example.com/graduate-planning-framework',
        snippet: '围绕项目匹配、申请准备与关键节点安排的升学规划参考。',
      },
      {
        title: '申请时间线检查清单',
        url: 'https://example.com/admissions-timeline',
        snippet: '用于梳理考试、文书、推荐信与提交节奏的流程化参考。',
      },
    ];
  }

  return [
    {
      title: '求职执行路线指南',
      url: 'https://example.com/career-search-guide',
      snippet: '围绕岗位定位、申请节奏与作品证明的就业准备建议。',
    },
    {
      title: '简历与作品集优化要点',
      url: 'https://example.com/resume-portfolio-notes',
      snippet: '帮助候选人更清晰地表达能力、方向与岗位匹配度。',
    },
  ];
};

const buildResponse = (mode: ChatMode, content: string) => {
  const topic = content.length > 72 ? `${content.slice(0, 72)}…` : content;

  if (mode === 'postgraduate') {
    return `针对你提到的“${topic}”，我会先确认目标专业与院校范围，再按匹配度、竞争度和截止时间筛出 3 到 5 个重点项目。接下来可以把你的背景拆成月度计划，覆盖考试准备、科研经历、文书策略和申请节奏。`;
  }

  return `针对你提到的“${topic}”，我会先明确目标岗位，再把简历叙事、作品集证据和投递节奏统一到同一个方向上。下一步通常是整理岗位分层、补强证明材料，并制定每周可执行的求职推进计划。`;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ChatMode>('postgraduate');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      id: uuidv4(),
      timestamp: new Date(),
      ...message,
    };

    setMessages((previous) => [...previous, newMessage]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      addMessage({ content, role: 'user' });
      setIsLoading(true);

      const assistantId = uuidv4();
      const finalResponse = buildResponse(mode, content);
      const sources = buildSources(mode);
      const chunks = finalResponse.match(/.{1,14}/g) ?? [finalResponse];
      let accumulatedContent = '';

      try {
        await wait(280);

        setMessages((previous) => [
          ...previous,
          {
            id: assistantId,
            content: '',
            role: 'assistant',
            timestamp: new Date(),
          },
        ]);

        for (const chunk of chunks) {
          accumulatedContent += chunk;
          setMessages((previous) =>
            previous.map((message) =>
              message.id === assistantId
                ? {
                    ...message,
                    content: accumulatedContent.trimStart(),
                  }
                : message,
            ),
          );
          await wait(70);
        }

        setMessages((previous) =>
          previous.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: finalResponse,
                  sources,
                }
              : message,
          ),
        );
      } catch (error) {
        console.error('Error sending message:', error);
        addMessage({
          content: '抱歉，我在处理这条请求时出了点问题。',
          role: 'assistant',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addMessage, mode],
  );

  useEffect(() => {
    clearMessages();
  }, [clearMessages, mode]);

  return (
    <ChatContext.Provider
      value={{
        mode,
        messages,
        isLoading,
        setMode,
        addMessage,
        clearMessages,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  return context;
};
