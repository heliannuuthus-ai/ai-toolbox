import { useState } from "react";
import Chat, { type MessageProps } from "@/components/chat";
import { sendMessage, uploadFiles } from "@/apis/glossary";
import { MessageRole } from "@/components/chat/box/Box";
import { FileMeta } from "@/apis/types";
import { v4 as uuidv4 } from "uuid";
import { Feedback as FeedbackType } from "@/apis/types";
const Glossary = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [filesMeta, setFilesMeta] = useState<FileMeta[]>([]);
  const [thinking, setThinking] = useState(false);
  const [generating, setGenerating] = useState(false);

  const onSubmit = async (values: any) => {
    const { message } = values;
    if (message.trim() === "" || generating) {
      return;
    }
    setGenerating(true);

    const userMessageId = uuidv4();
    const assistantMessageId = uuidv4();
    const timestamp = Date.now();

    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        {
          messageId: userMessageId, // temporary
          taskId: userMessageId, // temporary
          conversationId: userMessageId,
          role: MessageRole.USER,
          content: message,
          loading: false,
          createdAt: timestamp,
        },
        {
          messageId: assistantMessageId, // temporary
          taskId: assistantMessageId, // temporary
          conversationId: assistantMessageId,
          role: MessageRole.ASSISTANT,
          content: "",
          loading: true,
          createdAt: timestamp,
        },
      ];
    });

    try {
      const resp = await sendMessage(message, filesMeta, thinking);
      const reader = resp.data.getReader();
      const decoder = new TextDecoder();
      let buffer = ""; // 用于累积未完成的消息
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() || "";
        for (const chunk of chunks) {
          if (chunk.trim() === "") continue;
          const message = JSON.parse(chunk);
          setMessages((prevMessages) => {
            console.log("chunk", message, "prevMessages", prevMessages);
            return prevMessages.map((msg) => {
              if (
                msg.messageId !== userMessageId &&
                msg.messageId !== assistantMessageId &&
                msg.messageId !== message["message_id"]
              ) {
                return msg;
              }
              if (msg.role === MessageRole.ASSISTANT) {
                return {
                  ...msg,
                  content: msg.content + (message["answer"] || ""),
                  loading: false,
                };
              } else {
                return {
                  ...msg,
                  messageId: userMessageId,
                  taskId: message["task_id"],
                  conversationId: message["conversation_id"],
                  loading: false,
                };
              }
            });
          });
        }
      }
    } catch (error: any) {
      console.log("error", error);
    } finally {
      setGenerating(false);
    }
  };

  const onFilesChange = async (files: File[]) => {
    const filesMeta = await uploadFiles(files);
    setFilesMeta(filesMeta);
  };

  const onThinkingChange = async (thinking: boolean) => {
    setThinking(thinking);
  };

  return (
    <Chat
      messages={messages}
      generating={generating}
      onFeedback={async (feedback: FeedbackType) => {
        console.log("feedback", feedback);
      }}
      onSubmit={onSubmit}
      onStop={async () => {
        console.log("stop");
      }}
      onThinkingChange={onThinkingChange}
      onFilesChange={onFilesChange}
    />
  );
};

export default Glossary;
