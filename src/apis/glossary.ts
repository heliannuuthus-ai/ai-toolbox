import clientFactory from "@/apis/axios";
import { AxiosResponse } from "axios";
import { FileMeta, FeedbackType, ChatMessage } from "@/apis/types";

const client = clientFactory("/api/glossary");

export const fetchMessages = async (
  conversationId: string,
): Promise<AxiosResponse<ChatMessage[]>> => {
  return client.get(`/${conversationId}/messages`);
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
  console.log("sendMessage", prompt, filesMeta, thinking);
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
