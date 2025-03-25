import LightOff from "@/assets/images/button/light-off.svg?react";
import LightOn from "@/assets/images/button/light-on.svg?react";
import Icon from "@ant-design/icons";
import { Button, ButtonProps } from "antd";
import { useState } from "react";
const Thinking = ({
  value,
  onChange,
  ...props
}: {
  value?: boolean;
  onChange?: (value: boolean) => Promise<void>;
} & Omit<ButtonProps, "value" | "onClick" | "onChange">) => {
  const [thinking, setThinking] = useState(value ?? false);

  return (
    <Button
      {...props}
      onClick={() => {
        const tmp = !thinking;
        setThinking(tmp);
        onChange?.(tmp);
      }}
      variant={thinking ? "filled" : "outlined"}
      color="default"
      icon={
        <Icon
          style={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            borderRadius: "9999px",
          }}
          component={thinking ? LightOn : LightOff}
        />
      }
    />
  );
};

export default Thinking;
