import { ChatMessage, FeedbackType, ChatRole } from "@/apis/types";
import { Flex } from "antd";
import { Copy, Edit, Dislike, Like } from "@/components/buttons";
import { createStyles } from "antd-style";

// 定义样式
const useStyle = createStyles(({ css, cx }) => {
  const button = css`
    margin-top: 5px;
    padding-left: 1rem;
    padding-right: 1rem;
    cursor: pointer;
    font-size: 13px;
  `;

  const userReplyButton = cx(
    button,
    css`
      align-self: flex-end;
      display: inline-flex;
    `,
  );

  const aiReplyButton = cx(
    button,
    css`
      align-self: flex-start;
      display: inline-flex;
    `,
  );

  return {
    userReplyButton,
    aiReplyButton,
  };
});

const Buttons = ({
  className,
  message,
  onFeedback,
}: {
  className?: string;
  message: ChatMessage;
  onFeedback: (messageId: string, feedbackType: FeedbackType) => void;
}) => {
  const { styles } = useStyle();
  const isAi = message.role === ChatRole.ASSISTANT;
  const commonClassName = isAi ? styles.aiReplyButton : styles.userReplyButton;

  return (
    <Flex
      gap="small"
      className={className}
      style={{ direction: isAi ? "ltr" : "rtl" }}
    >
      <Copy className={commonClassName} content={message.content} />
      <Edit className={commonClassName} content={message.content} />
      {message.role === ChatRole.ASSISTANT && (
        <>
          <Dislike
            className={styles.aiReplyButton}
            message={message}
            onFeedback={onFeedback}
          />
          <Like
            className={styles.aiReplyButton}
            message={message}
            onFeedback={onFeedback}
          />
        </>
      )}
    </Flex>
  );
};

export default Buttons;
