import clientFactory from "@/apis/axios";
import { AxiosResponse } from "axios";

const client = clientFactory("/api/wikipedia");

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  stream?: boolean;
}

export interface Model {
  name: string;
}

export const getModels = async (
  search: string | null = null,
  page: number = 1,
  perPage: number = 10,
): Promise<AxiosResponse<Record<string, string>>> => {
  return await client.get("/models", {
    params: { search: search && `${search}`, page, per_page: perPage },
  });
};

export const wikipedia = async (
  model: string,
  prompt: string,
  image: File | null,
  onDownloadProgress: (progressEvent: string) => void,
): Promise<string> => {
  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("model", model);
  if (image) {
    formData.append("image", image);
  }
  return client.post("/glossary", formData, {
    onDownloadProgress: (progressEvent) => {
      const xhr = progressEvent.event.target;
      const { responseText }: { responseText: string } = xhr;
      onDownloadProgress(responseText);
    },
  });
};
