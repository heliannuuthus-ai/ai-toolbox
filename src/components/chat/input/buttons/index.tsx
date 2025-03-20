import { Form } from "antd";
import { createStyles } from "antd-style";
import { ReactNode } from "react";
import Thinking from "@/components/chat/input/buttons/Thinking";
import DeepSearch from "@/components/chat/input/buttons/DeepSearch";

const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    gap: 0.375rem;
    width: 100%;
    flex-grow: 1;
  `,
  buttons: css`
    display: flex;
    gap: 0.375rem;
    width: 100%;
    flex-grow: 1;
    svg {
      font-size: 20px;
    }
    button {
      border-radius: 9999px;
    }
  `,
  select: css`
    width: 100%;
  `,
}));

const Buttons = ({
  onThinkingChange,
  onDeepSearchChange,
  extras,
}: {
  onThinkingChange: (thinking: boolean) => void;
  onDeepSearchChange: (deepSearch: boolean) => void;
  extras?: Record<string, { valuePropName?: string; children: ReactNode }>;
}) => {
  const { styles } = useStyles();

  const form = Form.useFormInstance();

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Form.Item noStyle valuePropName="checked" name="deepsearch">
          <DeepSearch
            onDeepSearchChange={(deepSearch) => {
              onDeepSearchChange(deepSearch);
              onThinkingChange(false);
              form.setFieldsValue({ thinking: false });
            }}
          />
        </Form.Item>
        <Form.Item noStyle valuePropName="checked" name="thinking">
          <Thinking
            onThinkingChange={(thinking) => {
              onThinkingChange(thinking);
              onDeepSearchChange(false);
              form.setFieldsValue({ deepsearch: false });
            }}
          />
        </Form.Item>
      </div>
      {extras &&
        Object.entries(extras).map(([name, props]) => (
          <Form.Item
            key={name}
            noStyle
            name={name}
            valuePropName={props.valuePropName}
          >
            {props.children}
          </Form.Item>
        ))}
    </div>
  );
};

export default Buttons;
