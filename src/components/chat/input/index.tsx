import Buttons from "@/components/chat/input/buttons";
import Textarea from "@/components/chat/input/Textarea";
import Upload from "@/components/chat/input/Upload";
import { ButtonProps, Form, UploadProps } from "antd";
import { createStyles } from "antd-style";
import { useEffect } from "react";
import Submit from "@/components/chat/input/Submit";
import { TextAreaProps } from "antd/es/input";
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

export interface ChatInputProps {
  generating: boolean;
  placeholder?: string;
  onFilesChange: (files: File[]) => Promise<void>;
  onThinkingChange: (thinking: boolean) => Promise<void>;
  onDeepSearchChange: (deepSearch: boolean) => Promise<void>;
  onStop: () => Promise<void>;
  onSubmit: (values: any) => Promise<void>;
  components?: ChatInputComponents;
}

export interface ChatInputComponents {
  buttons?: React.ReactNode;
  textarea?: TextAreaProps;
  upload?: ChatInputUploadProps;
  submit?: React.ReactNode;
}

export interface ChatInputUploadProps extends UploadProps {
  button?: ButtonProps;
}

export interface ChatInputSubmitProps  {
  
}

const Input = ({
  generating,
  onFilesChange,
  onThinkingChange,
  onDeepSearchChange,
  onStop,
  onSubmit,
  components,
}: {
  generating: boolean;
  onFilesChange: (files: File[]) => Promise<void>;
  onThinkingChange: (thinking: boolean) => Promise<void>;
  onDeepSearchChange: (deepSearch: boolean) => Promise<void>;
  onStop: () => Promise<void>;
  onSubmit: (values: any) => Promise<void>;
  components?: ChatInputComponents;
}) => {
  const initialLocalValues = {
    message: "",
    files: [],
  };
  const [form] = Form.useForm();

  const { styles } = useStyles();

  useEffect(() => {}, []);

  const onFinish = async (values: any) => {
    try {
      form.setFieldsValue({ message: "" });
      await onSubmit(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Form
        form={form}
        className={styles.form}
        onFinish={onFinish}
        initialValues={initialLocalValues}
      >
        <div className={styles.textarea}>
          <Form.Item noStyle name="message">
            <Textarea {...components?.textarea} />
          </Form.Item>
        </div>
        <div className={styles.buttons}>
          <Form.Item noStyle name="files" valuePropName="fileList">
            <Upload onFilesChange={onFilesChange} {...components?.upload} />
          </Form.Item>
          <Form.Item noStyle>
            <Buttons
              onDeepSearchChange={onDeepSearchChange}
              onThinkingChange={onThinkingChange}
            />
          </Form.Item>
          <Form.Item noStyle label={null}>
            <Submit
              generating={generating}
              onSubmit={async () => {
                await onFinish(form.getFieldsValue());
              }}
              onStop={onStop}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Input;
