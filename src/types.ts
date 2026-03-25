export type ChatMode = 'postgraduate' | 'employment';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sources?: Source[];
}

export interface Source {
  title: string;
  url: string;
  snippet?: string;
}

export interface ChatContextType {
  mode: ChatMode;
  messages: Message[];
  isLoading: boolean;
  setMode: (mode: ChatMode) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  sendMessage: (content: string) => Promise<void>;
}