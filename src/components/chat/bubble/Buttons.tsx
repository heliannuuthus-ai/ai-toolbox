import { ChatMessage, FeedbackType } from "@/apis/types";
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
  isAi,
  message,
  onFeedback,
}: {
  className?: string;
  isAi: boolean;
  message: ChatMessage;
  onFeedback: (messageId: string, feedbackType: FeedbackType) => void;
}) => {
  const { styles } = useStyle();
  const commonClassName = isAi ? styles.aiReplyButton : styles.userReplyButton;

  return (
    <Flex
      gap="small"
      className={className}
      style={{ direction: isAi ? "ltr" : "rtl" }}
    >
      <Copy
        className={commonClassName}
        content={isAi ? message.answer : message.query}
      />
      <Edit
        className={commonClassName}
        content={isAi ? message.answer : message.query}
      />
      {isAi && (
        <>
          <Dislike
            className={styles.aiReplyButton}
            id={message.id}
            onFeedback={onFeedback}
          />
          <Like
            id={message.id}
            className={styles.aiReplyButton}
            onFeedback={onFeedback}
          />
        </>
      )}
    </Flex>
  );
};

export default Buttons;
