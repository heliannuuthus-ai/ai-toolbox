import { createStyles } from "antd-style";
import { BouncingDots } from "@/components/spin";
import Markdown from "react-markdown";
import Copy from "@/components/chat/box/Copy";
import Edit from "@/components/chat/box/Edit";
import Feedback from "@/components/chat/box/Feedback";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Feedback as FeedbackType } from "@/apis/types";

export interface MessageProps {
  messageId: string;
  taskId: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  createdAt: number;
  loading?: boolean;
}

export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
}

// 定义样式
const useStyle = createStyles(({ css, token, cx }) => {
  const button = css`
    margin-top: 5px;
    padding-left: 1rem;
    padding-right: 1rem;
    cursor: pointer;
    font-size: 13px;
    &:hover {
      background: ${token.colorBgTextHover};
      border: 0px solid ${token.colorBorder};
      border-radius: 1.5rem;
    }
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
    container: css`
      padding: 20px;
      max-width: 50rem;
      background: ${token.colorBgContainer};
      p {
        margin: 0;
      }
    `,
    messages: css`
      display: flex;
      flex-direction: column;
      gap: 10px;
    `,
    message: css`
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      position: relative;
      padding-left: 1rem;
      padding-right: 1rem;
    `,
    userMessage: css`
      align-items: flex-end;
      &:not(:hover) {
        .${userReplyButton} {
          opacity: 0;
        }
      }
    `,
    aiMessage: css`
      align-items: flex-start;
      &:not(:hover) {
        .${aiReplyButton} {
          opacity: 0;
        }
      }
    `,
    userBubble: css`
      background: ${token.colorBgElevated};
      color: ${token.colorText};
      text-align: right;
      max-width: 75%;
      padding-top: 0.625rem;
      padding-bottom: 0.625rem;
      padding-left: 1rem;
      padding-right: 1rem;
      border-radius: 1.5rem;
      border-bottom-right-radius: ${token.borderRadiusLG}px;
      box-shadow: ${token.boxShadowSecondary};
      word-wrap: break-word;
    `,
    aiBubble: css`
      background: var(--background-color);
      color: ${token.colorText};
      text-align: left;
      max-width: 75%;
      word-wrap: break-word;
    `,
    replyButton: css`
      transition-property: opacity;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 0.15s;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-bottom: 0.5rem;
      border-radius: ${token.borderRadiusLG}px;
      display: flex;
      align-items: center;
      gap: 2px;
      margin-left: -1rem;
      inset-inline-start: 0;
      inset-inline-end: 1rem;
      justify-content: flex-end;
      &:after,
      &:before {
        box-sizing: border-box;
        border: 0 solid ${token.colorBorder};
      }
    `,
    userReplyButton,
    aiReplyButton,
  };
});

const Box = ({
  messages,
  onFeedback,
}: {
  messages: MessageProps[];
  onFeedback: (feedback: FeedbackType) => void;
}) => {
  const { styles } = useStyle();

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div
            key={message.messageId}
            className={`${styles.message} ${
              message.role === MessageRole.USER
                ? styles.userMessage
                : styles.aiMessage
            }`}
          >
            <div
              className={`${
                message.role === MessageRole.USER
                  ? styles.userBubble
                  : styles.aiBubble
              }`}
            >
              {message.loading ? (
                <BouncingDots />
              ) : (
                <Markdown
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || "");

                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={dracula}
                          PreTag="div"
                          language={match[1]}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {message.content}
                </Markdown>
              )}
            </div>
            <Buttons message={message} onFeedback={onFeedback} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Buttons = ({
  message,
  onFeedback,
}: {
  message: MessageProps;
  onFeedback: (feedback: FeedbackType) => void;
}) => {
  const { styles } = useStyle();

  const className =
    message.role === MessageRole.USER
      ? `${styles.userReplyButton}`
      : `${styles.aiReplyButton}`;

  return (
    <div className={styles.replyButton}>
      <Copy className={className} message={message} />
      <Edit className={className} message={message} />
      {message.role === MessageRole.ASSISTANT && (
        <>
          <Feedback.Dislike
            className={styles.aiReplyButton}
            onFeedback={onFeedback}
          />
          <Feedback.Like
            className={styles.aiReplyButton}
            onFeedback={onFeedback}
          />
        </>
      )}
    </div>
  );
};

export default Box;
