import LightOff from "@/assets/images/button/light-off.svg?react";
import LightOn from "@/assets/images/button/light-on.svg?react";
import Icon from "@ant-design/icons";
import { Button } from "antd";
import { createStyles } from "antd-style";
import Select from "@/components/chat/input/Select";

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

const Functions = ({
  model,
  setModel,
  thinking,
  setThinking,
}: {
  model: string;
  setModel: (model: string) => void;
  thinking: boolean;
  setThinking: (thinking: boolean) => void;
}) => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Button
          color="default"
          variant={thinking ? "filled" : "outlined"}
          icon={
            <Icon
              style={{
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
              }}
              component={thinking ? LightOn : LightOff}
            />
          }
          onClick={() => setThinking(!thinking)}
        >
          思考
        </Button>
      </div>
      <Select model={model} setModel={setModel} thinking={thinking} />
    </div>
  );
};

export default Functions;
