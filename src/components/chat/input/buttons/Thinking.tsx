import LightOff from "@/assets/images/button/light-off.svg?react";
import LightOn from "@/assets/images/button/light-on.svg?react";
import Icon from "@ant-design/icons";
import { Button } from "antd";

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

export default Thinking;