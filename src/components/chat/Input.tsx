import { createStyles } from "antd-style";
import TextArea from "@/components/chat/input/Textarea";
import Functions from "@/components/chat/input/Functions";
import Upload from "@/components/chat/input/Upload";
import Submit from "@/components/chat/input/Submit";
import { wikipedia } from "@/apis/wikipedia";
import { MessageProps, MessageRole } from "@/components/chat/MessageBox";
import { useState } from "react";
const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;
    padding-bottom: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  `,
  form: css`
    position: relative;
    border-radius: 1.5rem;
    background-color: var(--background-color);
    box-shadow: ${token.boxShadow};
  `,
  textarea: css`
    padding-bottom: 3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  `,
  buttons: css`
    max-width: 100%;
    border-color: transparent;
    border-width: 2px;
    padding: 0.75rem;
    position: absolute;
    gap: 0.375rem;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    button {
      height: 36px;
    }
  `,
}));

const Input = ({
  setMessages,
}: {
  setMessages: (
    messageCreator: (prevMessages: MessageProps[]) => MessageProps[],
  ) => void;
}) => {
  const { styles } = useStyles();
  const [model, setModel] = useState<string>("");
  const [thinking, setThinking] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const onSubmit = async () => {
    const randomId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: randomId.toString(),
        role: MessageRole.USER,
        content: message,
      },
    ]);

    const assistantMessageId = (randomId + 1).toString(); // 确保 ID 唯一
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMessageId,
        role: MessageRole.ASSISTANT,
        content: "",
      },
    ]);
    await wikipedia(model, message, image, (responseText) => {
      setMessages((prevMessages) => {
        const lastAssistantMessageIndex = prevMessages.findIndex(
          (msg) => msg.id === assistantMessageId,
        );
        if (lastAssistantMessageIndex === -1) return prevMessages;
        console.log("responseText ====", responseText);
        const newMessages = [...prevMessages];
        newMessages[lastAssistantMessageIndex] = {
          ...newMessages[lastAssistantMessageIndex],
          content: responseText,
        };

        return newMessages;
      });
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.textarea}>
          <TextArea
            message={message}
            setMessage={setMessage}
            onSubmit={onSubmit}
          />
        </div>
        <div className={styles.buttons}>
          <Upload setImage={setImage} />
          <Functions
            model={model}
            setModel={setModel}
            thinking={thinking}
            setThinking={setThinking}
          />
          <Submit onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Input;
