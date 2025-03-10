import MessageBox, { MessageProps } from "@/components/chat/MessageBox";
import Input from "@/components/chat/Input";

import { createStyles } from "antd-style";
import { useEffect, useRef, useState } from "react";
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

const Box = () => {
  const { styles } = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);

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
          <MessageBox messages={messages} />
          <div style={{ paddingBottom: "144px" }}></div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <Input setMessages={setMessages} />
      </div>
    </>
  );
};

export default Box;
