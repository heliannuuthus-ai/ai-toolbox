import { Button, Select } from "antd";
import Icon from "@ant-design/icons";
import LightOn from "@/assets/images/button/light-on.svg?react";
import LightOff from "@/assets/images/button/light-off.svg?react";
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";
import { getModels, Model } from "@/apis/external";
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

  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    getModels().then((res) => {
      console.log(res);
      setModels(() => res.data.result);
    });
  }, []);

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
      <Select
        style={{ height: "36px", borderRadius: "9999px" }}
        options={models.map((model) => ({
          label: model.name,
          value: model.name,
        }))}
      />
    </div>
  );
};

export default Functions;
