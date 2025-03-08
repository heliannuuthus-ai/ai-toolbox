import React, { useEffect, useRef, useState } from "react";
import { createStyles } from "antd-style";
import Message, { MessageProps } from "@/components/chat/Message";
import Input from "@/components/chat/Input";

const useStyles = createStyles(({ css }) => ({
  chatBoxWrapper: css`
    width: 100%;
    height: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  `,
  messagesContainer: css`
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  `,
}));

const ChatBox: React.FC = () => {
  const { styles } = useStyles();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      id: "1",
      user: { avatar: "https://joeschmoe.io/api/v1/random", name: "张三" },
      content: "这是一条接收的消息。\n支持 **Markdown** 语法。",
      type: "received",
    },
  ]);

  // 自动滚动到底部
  useEffect(() => {
  }, [messages]);

  // 处理发送消息
  const handleSend = (content: string) => {
    const newMessage: MessageProps = {
      id: "2",
      user: { avatar: "https://joeschmoe.io/api/v1/jess", name: "我" },
      content,
      type: "sent",
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className={styles.chatBoxWrapper}>
      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <Message key={index} {...msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <Input onSend={handleSend} />
    </div>
  );
};

export default ChatBox;
