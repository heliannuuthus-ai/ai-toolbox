export interface FileMeta {
  id: string;
  name: string;
  size: number;
  extension: string;
  mime_type: string;
  created_by: string;
  created_at: string;
}

export enum FileChangeType {
  ADD = "add",
  REMOVE = "remove",
}

export enum FeedbackType {
  LIKE = "like",
  DISLIKE = "dislike",
  CANCEL = "cancel",
}

export interface ChatMessage {
  messageId: string;
  taskId: string;
  conversationId: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  loading?: boolean;
  metadata?: Record<string, any>;
}

export interface Usage {
  prompt_tokens: number;
  prompt_unit_price: string;
  prompt_price_unit: string;
  prompt_price: string;
  completion_tokens: number;
  completion_unit_price: string;
  completion_price_unit: string;
  completion_price: string;
  total_tokens: number;
  total_price: string;
  currency: string;
  latency: number;
}

export enum ChatRole {
  USER = "user",
  ASSISTANT = "assistant",
}
