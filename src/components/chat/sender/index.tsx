import { Sender as AntdSender, Attachments } from "@ant-design/x";
import { createStyles } from "antd-style";
import { Flex, Form, FormInstance, GetRef } from "antd";
import Header from "./Header";
import { Submit } from "@/components/buttons";
import { useRef } from "react";
import { UploadRequestOption } from "rc-upload/lib/interface";
const useStyles = createStyles(({ css, token }) => ({
  container: css`
    border-radius: 1.5rem;
    background-color: ${token.colorBgContainer};
    bottom: 24px;
  `,
}));

const Sender = ({
  generating,
  form,
  onFilesChange,
  onStop,
  onSubmit,
}: {
  generating: boolean;
  form: React.RefObject<FormInstance | null>;
  onFilesChange: (options: UploadRequestOption) => Promise<void>;
  onStop: () => Promise<void>;
  onSubmit: (values: any) => Promise<void>;
}) => {
  const { styles } = useStyles();

  const attachmentsRef = useRef<GetRef<typeof Attachments>>(null);

  const senderRef = useRef<GetRef<typeof AntdSender>>(null);

  const initValues = {
    uploading: false,
    thinking: false,
    deepSearch: false,
    message: "",
  };

  const onFinish = async (values: any) => {
    await onSubmit(values);
  };

  return (
    <Flex wrap gap={12} className={styles.container}>
      <Form
        onFinish={onFinish}
        ref={form}
        initialValues={initValues}
        style={{ width: "100%" }}
        layout="vertical"
      >
        <Form.Item name="message" noStyle>
          <AntdSender
            ref={senderRef}
            className={styles.container}
            styles={{
              input: {
                fontSize: "16px",
              },
            }}
            header={
              <Header
                senderRef={senderRef}
                attachmentsRef={attachmentsRef}
                onFilesChange={onFilesChange}
              />
            }
            allowSpeech={true}
            actions={
              <Submit
                generating={generating}
                onSubmit={async () => {
                  await onFinish(form?.current?.getFieldsValue(true));
                }}
                onStop={onStop}
              />
            }
            onSubmit={async (_) => {
              await onSubmit(form?.current?.getFieldsValue(true));
            }}
          />
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Sender;
