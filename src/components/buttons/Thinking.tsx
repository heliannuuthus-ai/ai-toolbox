import LightOff from "@/assets/images/button/light-off.svg?react";
import LightOn from "@/assets/images/button/light-on.svg?react";
import Icon from "@ant-design/icons";
import { Button, ButtonProps } from "antd";
const Thinking = ({
  value,
  onChange,
  ...props
}: {
  value?: boolean;
  onChange?: (value: boolean) => Promise<void>;
} & Omit<ButtonProps, "value" | "onClick" | "onChange">) => {
  const handleClick = async () => {
    onChange?.(!value);
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      variant={value ? "filled" : "outlined"}
      color="default"
      icon={
        <Icon
          style={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            borderRadius: "9999px",
          }}
          component={value ? LightOn : LightOff}
        />
      }
    />
  );
};

export default Thinking;
