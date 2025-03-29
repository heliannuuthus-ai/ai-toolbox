import clientFactory from "@/apis/axios";
import { AxiosResponse } from "axios";
import {
  FileMeta,
  FeedbackType,
  Conversation,
  HistoryMessage,
} from "@/apis/types";

const client = clientFactory("/api/glossary");

export const stopTask = async (taskId: string) => {
  return client.post(`/chat/${taskId}/stop`);
};

export const getSuggested = async (id: string) => {
  return client.get(`/suggested/${id}`);
};

export const audioToText = async (audio: File) => {
  return client.post("/audio-to-text", audio);
};

export const textToSpeech = async (id?: string, text?: string) => {
  return client.post(`/text-to-speech`, {
    message_id: id,
    text,
  });
};

export const fetchConversations = async (
  lastId?: string,
  limit = 20,
): Promise<
  AxiosResponse<{
    limit: number;
    has_more: boolean;
    data: Conversation[];
  }>
> => {
  return client.get("/conversations", {
    params: { last_id: lastId, limit },
  });
};

export const fetchMessages = async (
  conversationId: string,
): Promise<
  AxiosResponse<{
    limit: number;
    has_more: boolean;
    data: HistoryMessage[];
  }>
> => {
  return client.get(`conversations/${conversationId}/messages`);
};

export const fetchFileTypes = async (): Promise<
  AxiosResponse<Record<string, string[]>>
> => {
  return client.get("/file-types");
};

export const feedback = async (messageId: string, feedback: FeedbackType) => {
  return client.post(`/${messageId}/feedback`, {
    rating: feedback == FeedbackType.CANCEL ? null : feedback,
    content: "nice glossary",
  });
};

export const uploadFiles = async (
  file: File,
): Promise<AxiosResponse<FileMeta>> => {
  const formData = new FormData();
  formData.append("file", file);
  return client.post("/upload", formData);
};

export const sendMessage = async (
  prompt: string,
  filesMeta: FileMeta[],
  thinking: boolean,
  deepSearch: boolean,
): Promise<AxiosResponse<ReadableStream>> => {
  return client.post(
    "/chat",
    {
      prompt,
      thinking,
      files_meta: filesMeta,
      deep_search: deepSearch,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      responseType: "stream",
      adapter: "fetch",
    },
  );
};
