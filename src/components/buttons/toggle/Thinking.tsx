import LightOff from "@/assets/images/button/light-off.svg?react";
import LightOn from "@/assets/images/button/light-on.svg?react";
import Icon from "@ant-design/icons";
import { ButtonProps } from "antd";
import Toggle from "./Toggle";
const Thinking = ({
  value,
  onChange,
  ...props
}: {
  value?: boolean;
  onChange?: (value: boolean) => Promise<void>;
} & Omit<ButtonProps, "value" | "onClick" | "onChange">) => {
  return (
    <Toggle
      {...props}
      value={value}
      onChange={onChange}
      variant={value ? "filled" : "outlined"}
      color="default"
      shape="round"
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
