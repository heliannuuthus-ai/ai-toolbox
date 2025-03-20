import clientFactory from "@/apis/axios";
import { AxiosResponse } from "axios";
import { FileMeta, FeedbackType } from "@/apis/types";

const client = clientFactory("/api/glossary");

export const feedback = async (messageId: string, feedback: FeedbackType) => {
  return client.post(`/${messageId}/feedback`, {
    rating: feedback == FeedbackType.CANCEL ? null : feedback,
    content: "nice glossary",
  });
};

export const uploadFiles = async (files: File[]): Promise<FileMeta[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  return client.post("/upload", formData);
};

export const sendMessage = async (
  prompt: string,
  filesMeta: FileMeta[],
  thinking: boolean,
  deepSearch: boolean
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
    }
  );
};
