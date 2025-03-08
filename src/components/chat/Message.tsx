import React from "react";
import Markdown from "react-markdown";
import { createStyles } from "antd-style";
import { Avatar } from "antd";

const useStyles = (props: { type: "sent" | "received" }) =>
  createStyles(({ css }) => ({
    message: css`
      display: flex;
      align-items: flex-start;
      padding: 10px 16px;
      gap: 10px;
      justify-content: ${props.type === "sent" ? "flex-end" : "flex-start"};
      flex-direction: ${props.type === "sent" ? "row-reverse" : "row"};
    `,
    avatar: css`
      width: 40px;
      height: 40px;
    `,
    messageContainer: css`
      display: flex;
      flex-direction: column;
      max-width: 70%;
    `,
    userName: css`
      font-weight: bold;
      font-size: 14px;
      color: #333;
      margin-bottom: 4px;
    `,
    messageContent: css`
      background: var(--background-color);
      padding: 8px 12px;
      border-radius: 8px;
      color: #333;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
      text-align: ${props.type === "sent" ? "right" : "left"};
    `,
  }));

export interface MessageProps {
  id: string;
  user: {
    avatar: string;
    name: string;
  };
  content: string;
  type: "sent" | "received";
}

const Message: React.FC<MessageProps> = ({
  id,
  user,
  content,
  type,
}: MessageProps) => {
  const { styles } = useStyles({ type })();
  return (
    <div id={id} className={styles.message}>
      {type === "received" && (
        <Avatar src={user.avatar} className={styles.avatar} />
      )}
      <div className={styles.messageContainer}>
        <div className={styles.userName}>{user.name}</div>
        <div className={styles.messageContent}>
          <Markdown>{content}</Markdown>
        </div>
      </div>
      {type === "sent" && <Avatar src={user.avatar} className={styles.avatar} />}
    </div>
  );
};

export default Message;
