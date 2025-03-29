import { ButtonProps } from "antd";
import BreakIcon from "@/assets/images/button/sider-outline.svg?react";
import OpenIcon from "@/assets/images/button/sider-fill.svg?react";
import Icon from "@ant-design/icons";
import Toggle from "./Toggle";

const Sider = ({
  value,
  onChange,
  ...props
}: {
  value?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
} & Omit<ButtonProps, "value" | "onChange">) => {
  return (
    <Toggle
      value={value}
      onChange={onChange}
      shape="circle"
      type="text"
      icon={<Icon component={value ? OpenIcon : BreakIcon} />}
      {...props}
    />
  );
};

export default Sider;
