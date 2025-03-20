import { Box } from "@/components/chat/box";
import Input from "@/components/chat/input";
import { ChatMessage, FeedbackType } from "@/apis/types";
import { createStyles } from "antd-style";
import { useEffect, useRef } from "react";
const useStyles = createStyles(({ css }) => ({
  container: css`
    height: 100%;
    overflow-y: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    scroll-behavior: smooth;
  `,
  messageContainer: css`
    width: 100%;
    max-width: 50rem;
  `,
  inputContainer: css`
    position: absolute;
    bottom: 0;
    left: var(--sidebar-width);
    right: 0;
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
  `,
}));

const Chat = ({
  generating,
  placeholder,
  messages,
  onFeedback,
  onSubmit,
  onStop,
  onFilesChange,
  onDeepSearchChange,
  onThinkingChange,
}: {
  generating: boolean;
  placeholder?: string;
  messages: ChatMessage[];
  onFeedback: (messageId: string, feedbackType: FeedbackType) => Promise<void>;
  onSubmit: (values: any) => Promise<void>;
  onStop: () => Promise<void>;
  onFilesChange: (files: File[]) => Promise<void>;
  onDeepSearchChange: (deepSearch: boolean) => Promise<void>;
  onThinkingChange: (thinking: boolean) => Promise<void>;
}) => {
  const { styles } = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!messageContainerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    });
    resizeObserver.observe(messageContainerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.messageContainer} ref={messageContainerRef}>
          <Box messages={messages} onFeedback={onFeedback} />
          <div style={{ paddingBottom: "144px" }}></div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <Input
          generating={generating}
          components={{
            textarea: {
              placeholder,
            },
            upload: {},
          }}
          onFilesChange={onFilesChange}
          onDeepSearchChange={onDeepSearchChange}
          onThinkingChange={onThinkingChange}
          onStop={onStop}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default Chat;
