import { Button, Select } from "antd";
import Icon from "@ant-design/icons";
import LightOn from "@/assets/images/button/light-on.svg?react";
import LightOff from "@/assets/images/button/light-off.svg?react";
import { createStyles } from "antd-style";
import { useState } from "react";

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

const Functions = () => {
  const [selectedThink, setSelectedThink] = useState<boolean>(false);
  const { styles } = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Button
          color="default"
          variant={selectedThink ? "filled" : "outlined"}
          icon={
            <Icon
              style={{
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
              }}
              component={selectedThink ? LightOn : LightOff}
            />
          }
          onClick={() => setSelectedThink(!selectedThink)}
        >
          思考
        </Button>
      </div>
      <Select style={{ height: "36px", borderRadius: "9999px" }} />
    </div>
  );
};

export default Functions;
