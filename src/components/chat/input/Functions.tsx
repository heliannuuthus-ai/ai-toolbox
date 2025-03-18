import LightOff from "@/assets/images/button/light-off.svg?react";
import LightOn from "@/assets/images/button/light-on.svg?react";
import Icon from "@ant-design/icons";
import { Button, Form } from "antd";
import { createStyles } from "antd-style";
import { ReactNode } from "react";
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

const Thinking = ({
  checked,
  onChange,
  onThinkingChange,
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onThinkingChange: (thinking: boolean) => void;
}) => {
  return (
    <Button
      onClick={() => {
        const thinking = !checked;
        onChange?.(thinking);
        onThinkingChange(thinking);
      }}
      variant={checked ? "filled" : "outlined"}
      color="default"
      icon={
        <Icon
          style={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            borderRadius: "9999px",
          }}
          component={checked ? LightOn : LightOff}
        />
      }
    >
      思考
    </Button>
  );
};

const Functions = ({
  onThinkingChange,
  extras,
}: {
  onThinkingChange: (thinking: boolean) => void;
  extras?: Record<string, { valuePropName?: string; children: ReactNode }>;
}) => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Form.Item noStyle valuePropName="checked" name="thinking">
          <Thinking onThinkingChange={onThinkingChange} />
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

export default Functions;
