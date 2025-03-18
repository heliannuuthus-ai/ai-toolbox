import clientFactory from "@/apis/axios";
import { AxiosResponse } from "axios";
import { FileMeta } from "@/apis/types";

const client = clientFactory("/api/glossary");

export const uploadFiles = async (files: File[]): Promise<FileMeta[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  return client.post("/glossary/upload", formData);
};

export const sendMessage = async (
  prompt: string,
  filesMeta: FileMeta[],
  thinking: boolean,
): Promise<AxiosResponse<ReadableStream>> => {
  console.log("sendMessage", prompt, filesMeta, thinking);
  return client.post(
    "/chat",
    {
      prompt,
      thinking,
      filesMeta,
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
