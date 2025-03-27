import Bubble from "@/components/chat/bubble";
import Sender from "@/components/chat/sender";
import { ChatMessage, FeedbackType } from "@/apis/types";
import { createStyles } from "antd-style";
import { FormInstance } from "antd";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { useState } from "react";
import { WorkflowClient } from "@/utils/dify";

const useStyles = createStyles(({ css }) => ({
  bubbleContainer: css`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
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
  messages,
  generating,
  onFeedback,
  onSubmit,
  onStop,
  onFilesChange,
}: {
  form: React.RefObject<FormInstance | null>;
  messages: ChatMessage[];
  generating: boolean;
  onFeedback: (messageId: string, feedbackType: FeedbackType) => Promise<void>;
  onFilesChange: (options: UploadRequestOption) => Promise<void>;
  onSubmit: (values: any) => Promise<void>;
  onStop: () => Promise<void>;
}) => {
  const { styles } = useStyles();

  return (
    <>
      <div className={styles.bubbleContainer}>
        <Bubble messages={messages} onFeedback={onFeedback} />
      </div>
      <div className={styles.inputContainer}>
        <Sender
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
