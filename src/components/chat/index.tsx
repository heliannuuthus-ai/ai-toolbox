import { Bubble } from "@/components/chat/bubble";
import Input from "@/components/chat/sender";
import { ChatMessage, FeedbackType } from "@/apis/types";
import { createStyles } from "antd-style";
import { FormInstance } from "antd";
import { useEffect, useRef } from "react";
import { UploadRequestOption } from "rc-upload/lib/interface";
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
  form,
  generating,
  messages,
  onFeedback,
  onSubmit,
  onStop,
  onFilesChange,
}: {
  form: React.RefObject<FormInstance | null>;
  generating: boolean;
  messages: ChatMessage[];
  onFeedback: (messageId: string, feedbackType: FeedbackType) => Promise<void>;
  onFilesChange: (options: UploadRequestOption) => Promise<void>;
  onSubmit: (values: any) => Promise<void>;
  onStop: () => Promise<void>;
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
          <Bubble messages={messages} onFeedback={onFeedback} />
          <div style={{ paddingBottom: "144px" }}></div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <Input
          form={form}
          generating={generating}
          onFilesChange={onFilesChange}
          onStop={onStop}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default Chat;
