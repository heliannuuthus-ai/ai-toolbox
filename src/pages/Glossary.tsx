import { useEffect, useRef, useState } from "react";
import Chat from "@/components/chat";
import { sendMessage, uploadFiles, feedback } from "@/apis/glossary";
import { ChatMessage, FileMeta } from "@/apis/types";
import { v4 as uuidv4 } from "uuid";
import { FeedbackType, ChatRole } from "@/apis/types";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { FormInstance } from "antd/es/form";
import { UploadFile } from "antd";
import { EventType, WorkflowClient } from "@/utils/dify";
import { load, save, LazyStore } from "@tauri-apps/plugin-store";

const store = new LazyStore("glossary");
const dify = new WorkflowClient("/api/glossary");

const Glossary = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [generating, setGenerating] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const form = useRef<FormInstance>(null);

  const init = async () => {
    const conversationId = await store.get<string>("conversation_id");
    if (conversationId && conversationId.length > 0) {
      setConversationId(conversationId);
    }
  };

  const cleanup = async () => {};


  useEffect(() => {
    init();

    dify
      .on(EventType.WORKFLOW_STARTED, (data) => {
        console.log("workflow started", data);
      })
      .on(EventType.WORKFLOW_FINISHED, (data) => {
        console.log("workflow finished", data);
      })
      .on(EventType.NODE_STARTED, (data) => {
        console.log("node started", data);
      })
      .on(EventType.NODE_FINISHED, (data) => {
        console.log("node finished", data);
      })
      .on(EventType.MESSAGE, (message) => {})
      .on(EventType.MESSAGE_END, (data) => {
        console.log("message end", data);
      })
      .on(EventType.ERROR, (error) => {
        console.log("error", error);
      });

    return () => {
      (async () => {
        if (conversationId) {
          try {
            await store.set("conversation_id", conversationId);
          } catch (error) {
            console.log("error", error);
          }
        }
      })();
      dify.cleanup();
    };
  }, []);

  const onSubmit = async (_: any) => {
    const {
      message,
      thinking,
      deepSearch,
      files = [],
    } = form.current?.getFieldsValue(true);
    if (message.trim() === "" || generating) {
      return;
    }
    form.current?.setFieldsValue({ message: "" });
    setGenerating(true);
    const userMessageId = uuidv4();
    const assistantMessageId = uuidv4();
    const timestamp = Date.now();

    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        {
          id: "",
          taskId: "",
          conversationId: "",
          query: message,
          answer: "",
          createdAt: timestamp,
        },
      ];
    });

    try {
      const resp = await sendMessage(
        message,
        Object.values(
          files.map(
            (file: UploadFile & { metadata?: FileMeta }) => file.metadata,
          ),
        ),
        thinking,
        deepSearch,
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
                msg.id !== userMessageId &&
                msg.id !== assistantMessageId &&
                msg.id !== message["message_id"]
              ) {
                return msg;
              }
              if (msg.role === ChatRole.ASSISTANT) {
                return {
                  ...msg,
                  id: message["message_id"],
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
                  id: userMessageId,
                  taskId: message["task_id"],
                  conversationId: message["conversation_id"],
                  loading: false,
                  createdAt: message["created_at"],
                };
              }
            });
          });
          console.log("message", data);
        }
      }
    } catch (error: any) {
      console.log("error", error);
      setMessages((prevMessages) => {
        return prevMessages.map((msg) => {
          if (msg.id === assistantMessageId) {
            return { ...msg, content: "发送失败，请重试", loading: false };
          }
          return msg;
        });
      });
    } finally {
      setGenerating(false);
    }
  };

  const onFilesChange = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError } = options;

    await uploadFiles(file as File)
      .then((fileMeta) => {
        onSuccess?.(fileMeta.data);
      })
      .catch((error) => {
        onError?.(error);
      });
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
      form={form}
      messages={messages}
      generating={generating}
      onFeedback={onFeedback}
      onSubmit={onSubmit}
      onStop={onStop}
      onFilesChange={onFilesChange}
    />
  );
};

export default Glossary;
