import { createStyles } from "antd-style";
import { Button } from "antd";
import Markdown from "react-markdown";
import Copy from "@/assets/images/button/copy.svg?react";
import Edit from "@/assets/images/button/edit.svg?react";
import Icon from "@ant-design/icons";

export interface MessageProps {
  id: number;
  role: MessageRole;
  content: string;
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
      height: 100%;
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
      max-width: 70%;
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

// 模拟聊天数据
const messages: MessageProps[] = [
  {
    id: 1,
    role: MessageRole.USER,
    content: "你好",
  },
  {
    id: 2,
    role: MessageRole.ASSISTANT,
    content: "你好！今天有什么可以帮你的吗？😊",
  },
  {
    id: 3,
    role: MessageRole.ASSISTANT,
    content: "当然，是暂停吗！😊",
  },
  {
    id: 4,
    role: MessageRole.USER,
    content:
      "我短时间内不会用 AI 你能112313123123不能有个暂停的路线1111231111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
  },
  {
    id: 5,
    role: MessageRole.USER,
    content:
      "我短时间内不会用 AI 你能112313123123不能有个暂停的路线1111231111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
  },
  {
    id: 6,
    role: MessageRole.ASSISTANT,
    content:
      "我短时间内不会用 AI 你能112313123123不能有个暂停的路线1111231111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
  },
  {
    id: 7,
    role: MessageRole.USER,
    content:
      "我短时间内不会用 AI 你能112313123123不能有个暂停的路线1111231111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
  },
];

const MessageBox = () => {
  const { styles } = useStyle();

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div
            key={message.id}
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
              <Markdown>{message.content}</Markdown>
            </div>
            <Buttons message={message} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Buttons = ({ message }: { message: MessageProps }) => {
  const { styles } = useStyle();
  return (
    <div className={styles.replyButton}>
      <Button
        className={
          message.role === MessageRole.USER
            ? `${styles.userReplyButton}`
            : `${styles.aiReplyButton}`
        }
        shape="circle"
        type="text"
        icon={<Icon component={Copy} />}
      />
      <Button
        className={
          message.role === MessageRole.USER
            ? `${styles.userReplyButton}`
            : `${styles.aiReplyButton}`
        }
        shape="circle"
        type="text"
        icon={<Icon component={Edit} />}
      />
    </div>
  );
};

export default MessageBox;
