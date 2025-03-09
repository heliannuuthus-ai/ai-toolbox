import { ConfigProvider, Flex, Input } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";

const { TextArea: AntdTextArea } = Input;

const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    width: 100%;
    position: relative;
  `,
  textareaBox: css`
    width: 100%;
    overflow-y: auto;
  `,
  textarea: css`
    padding-top: 1.25rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-bottom: 1.25rem;
    border-width: 0px;
    textarea {
      padding: 0;
      border: none;
      resize: none;
    }
    &:focus {
      border: none;
      box-shadow: none;
      outline: none;
    }
  `,
  message: css`
    display: none;
  `,
}));
export const Textarea = () => {
  const [message, setMessage] = useState<string>("");

  const { styles } = useStyles();
  return (
    <Flex className={styles.container} align="center" vertical>
      <div className={styles.textareaBox}>
        <span className={styles.message}>{message}</span>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                paddingInlineLG: 0,
                paddingInlineSM: 0,
                paddingBlockLG: 0,
                paddingBlockSM: 0,
              },
            },
          }}
        >
          <AntdTextArea
            className={styles.textarea}
            size="large"
            autoSize={{ minRows: 1, maxRows: 7 }}
            placeholder="想向 wikipedia 了解什么？"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </ConfigProvider>
      </div>
    </Flex>
  );
};

export default Textarea;
