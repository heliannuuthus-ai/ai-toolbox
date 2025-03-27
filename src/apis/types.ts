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
  id: string;
  conversationId: string;
  query: string;
  answer: string;
  createdAt: number;
  loading?: boolean;
}

export enum ChatRole {
  USER = "user",
  ASSISTANT = "assistant",
}

export interface Conversation {
  id: string;
  name: string;
  createdAt: number;
  query: string;
  answer: string;
  inputs: Record<string, any>;
  message_files: FileMeta[];
  feedback: FeedbackType | null;
  retriever_resources: RetrieverResource[];
  created_at: number;
}

export interface RetrieverResource {
  position: number;
  dataset_id: string;
  dataset_name: string;
  document_id: string;
  document_name: string;
  segment_id: string;
  score: number;
  content: string;
}

export interface HistoryMessage {
  id: string;
  conversation_id: string;
  parent_message_id: string;
  query: string;
  answer: string;
  status: string;
  feedback: FeedbackType | null;
  error: string | null;
  inputs: Record<string, any>;
  message_files: FileMeta[];
  retriever_resources: RetrieverResource[];
  created_at: number;
}
