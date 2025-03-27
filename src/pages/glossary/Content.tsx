import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import Chat from "@/components/chat";
import {
  uploadFiles,
  feedback,
  fetchMessages,
  stopTask,
} from "@/apis/glossary";
import { ChatMessage } from "@/apis/types";
import { FeedbackType } from "@/apis/types";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { FormInstance } from "antd/es/form";
import { EventType, WorkflowClient } from "@/utils/dify";
import { LazyStore } from "@tauri-apps/plugin-store";
import { Usage } from "@/types/common";

const store = new LazyStore("glossary", { autoSave: false });

const Content = () => {
  const [state, setState] = useState({
    messages: [] as ChatMessage[],
    generating: false,
  });
  const [conversationId, setConversationId] = useState<string | null>(null);
  const taskId = useRef<string | null>(null);
  const form = useRef<FormInstance>(null);

  const difyClient = useMemo(() => new WorkflowClient("/api/glossary"), []);

  const init = useCallback(async () => {
    try {
      const newConversationId = await store.get<string>("conversation_id");

      if (newConversationId && newConversationId?.length > 0) {
        setConversationId(newConversationId);
      }
    } catch (error) {
      console.error("初始化失败:", error);
    }
  }, []);

  const clean = useCallback(async () => {
    try {
      await store.save();
    } catch (error) {
      console.error("save store error", error);
    }
  }, []);

  const listen = useCallback(async () => {
    console.log("start listening glossary workflow");
    difyClient
      .on(EventType.WORKFLOW_STARTED, async (data) => {
        console.log("workflow started", data);
      })
      .on(EventType.WORKFLOW_FINISHED, async (data) => {
        console.log("workflow finished", data);
      })
      .on(EventType.NODE_STARTED, async (data) => {
        console.log("node started", data);
      })
      .on(EventType.NODE_FINISHED, async (data) => {
        console.log("node finished", data);
      })
      .on(EventType.MESSAGE, async (message) => {
        await store.set("conversation_id", message.conversation_id);
        setState((prevState) => {
          console.log("chunk", message, "prevState", prevState);
          return {
            ...prevState,
            messages: prevState.messages.map((msg) => {
              if (msg.id !== "" && msg.id !== message.message_id) {
                return msg;
              }
              setConversationId(message.conversation_id);
              return {
                ...msg,
                id: message.message_id,
                taskId: message.task_id,
                conversationId: message.conversation_id,
                answer: msg.answer + (message.answer || ""),
                loading: false,
                createdAt: message.created_at,
              };
            }),
          };
        });
      })
      .on(EventType.MESSAGE_END, async (data) => {
        const newUsage = data.metadata.usage;
        if (newUsage) {
          const usage = await store.get<Usage>("usage");
          if (usage) {
            await store.set("usage", {
              ...usage,
              total_tokens: usage.total_tokens + newUsage.total_tokens,
              total_price: String(
                Number(usage.total_price) + Number(newUsage.total_price),
              ),
              latency: usage.latency + newUsage.latency,
              currency: newUsage.currency,
            });
          } else {
            await store.set("usage", newUsage);
          }
        }
      })
      .on(EventType.ERROR, async (error) => {
        console.error("error", error);
      });
  }, [difyClient]);

  const getMessages = useCallback(async () => {
    if (!conversationId) {
      return;
    }
    await fetchMessages(conversationId)
      .then((resp) => {
        setState((prev) => ({
          ...prev,
          messages: resp.data.data.map((msg) => {
            return {
              id: msg.id,
              conversationId: msg.conversation_id,
              query: msg.query,
              answer: msg.answer,
              loading: false,
              createdAt: msg.created_at,
            } as ChatMessage;
          }),
        }));
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [conversationId]);

  useEffect(() => {
    getMessages();
  }, [conversationId]);

  useEffect(() => {
    init();
    listen();
    difyClient.setCanceler(async () => {
      if (taskId.current) {
        console.log("stop task", taskId.current);
        await stopTask(taskId.current);
      }
    });

    return () => {
      (async () => {
        try {
          await clean();
        } catch (error) {
          console.error("清理失败:", error);
        }
      })();
      difyClient.cleanup();
    };
  }, []);

  const onSubmit = useCallback(
    async (_: any) => {
      const {
        message,
        mode,
        files = [],
      } = form.current?.getFieldsValue(true) ?? {};
      if (message?.trim() === "" || state.generating) return;

      try {
        form.current?.setFieldsValue({ message: "" });
        setState((prev) => ({
          ...prev,
          generating: true,
          messages: [
            ...prev.messages,
            {
              id: "",
              taskId: "",
              conversationId: "",
              query: message,
              answer: "",
              loading: true,
              createdAt: 0,
            },
          ],
        }));

        await difyClient.run("POST", "/chat", {
          query: message,
          files,
          mode,
          conversation_id: conversationId,
        });
      } catch (error) {
        console.error("提交消息失败:", error);
      } finally {
        setState((prev) => ({ ...prev, generating: false }));
      }
    },
    [state.generating, difyClient],
  );

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
      messages={state.messages}
      generating={state.generating}
      onFeedback={onFeedback}
      onSubmit={onSubmit}
      onStop={onStop}
      onFilesChange={onFilesChange}
    />
  );
};

export default Content;
