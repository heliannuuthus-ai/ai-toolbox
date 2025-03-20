import { useState } from "react";
import Chat from "@/components/chat";
import { sendMessage, uploadFiles, feedback } from "@/apis/glossary";
import { ChatMessage, FileMeta } from "@/apis/types";
import { v4 as uuidv4 } from "uuid";
import { FeedbackType, ChatRole } from "@/apis/types";
const Glossary = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [filesMeta, setFilesMeta] = useState<FileMeta[]>([]);
  const [thinking, setThinking] = useState(false);
  const [deepSearch, setDeepSearch] = useState(false);
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
          role: ChatRole.USER,
          content: message,
          loading: false,
          createdAt: timestamp,
        },
        {
          messageId: assistantMessageId, // temporary
          taskId: assistantMessageId, // temporary
          conversationId: assistantMessageId,
          role: ChatRole.ASSISTANT,
          content: "",
          loading: true,
          createdAt: timestamp,
        },
      ];
    });

    try {
      const resp = await sendMessage(
        message,
        filesMeta,
        thinking,
        deepSearch
      );
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
              if (msg.role === ChatRole.ASSISTANT) {
                return {
                  ...msg,
                  messageId: message["message_id"],
                  taskId: message["task_id"],
                  conversationId: message["conversation_id"],
                  content: msg.content + (message["answer"] || ""),
                  loading: false,
                  createdAt: message["created_at"],
                  metadata: message["metadata"],
                };
              } else {
                return {
                  ...msg,
                  messageId: userMessageId,
                  taskId: message["task_id"],
                  conversationId: message["conversation_id"],
                  loading: false,
                  createdAt: message["created_at"],
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
    console.log("thinking", thinking);
  };

  const onDeepSearchChange = async (deepSearch: boolean) => {
    setDeepSearch(deepSearch);
    console.log("deepSearch", deepSearch);
  };

  const onStop = async () => {
    console.log("stop");
  };

  const onFeedback = async (messageId: string, feedbackType: FeedbackType) => {
    console.log("messageId", messageId, "feedbackType", feedbackType);
    await feedback(messageId, feedbackType);
  };

  return (
    <Chat
      messages={messages}
      placeholder="请输入想了解的词条？"
      generating={generating}
      onFeedback={onFeedback}
      onSubmit={onSubmit}
      onStop={onStop}
      onThinkingChange={onThinkingChange}
      onFilesChange={onFilesChange}
      onDeepSearchChange={onDeepSearchChange}
    />
  );
};

export default Glossary;
