import LightOff from "@/assets/images/button/light-off.svg?react";
import LightOn from "@/assets/images/button/light-on.svg?react";
import Icon from "@ant-design/icons";
import { Button, Form } from "antd";
import { createStyles } from "antd-style";
import Select from "@/components/chat/input/Select";
import { useEffect } from "react";
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
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) => {
  return (
    <Button
      onClick={() => onChange?.(!checked)}
      variant={checked ? "filled" : "outlined"}
      color="default"
      icon={
        <Icon
          style={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
          }}
          component={checked ? LightOn : LightOff}
        />
      }
    >
      思考
    </Button>
  );
};

const Functions = () => {
  const { styles } = useStyles();

  const form = Form.useFormInstance();
  const model = Form.useWatch("model", form);
  const models = Form.useWatch("models", { form, preserve: true });

  useEffect(() => {}, [models]);

  return (
    <div className={styles.container}>
      {models && models[model] && models[model].reasoner_model != "" && (
        <div className={styles.buttons}>
          <Form.Item noStyle valuePropName="checked" name="thinking">
            <Thinking />
          </Form.Item>
        </div>
      )}
      <Form.Item noStyle name="model">
        <Select />
      </Form.Item>
    </div>
  );
};

export default Functions;
