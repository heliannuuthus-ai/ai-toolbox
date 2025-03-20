import { ConfigProvider, Flex, Form, Input } from "antd";
import { createStyles } from "antd-style";
import { TextAreaProps } from "antd/es/input";

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

export const Textarea = ({ value, onChange, ...props }: TextAreaProps) => {
  const form = Form.useFormInstance();

  const { styles } = useStyles();
  return (
    <Flex className={styles.container} align="center" vertical>
      <div className={styles.textareaBox}>
        <span className={styles.message}>{value + ""}</span>
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
            {...props}
            value={value}
            onChange={onChange}
            onPressEnter={(e) => {
              e.preventDefault();
              form.submit();
            }}
          />
        </ConfigProvider>
      </div>
    </Flex>
  );
};

export default Textarea;
