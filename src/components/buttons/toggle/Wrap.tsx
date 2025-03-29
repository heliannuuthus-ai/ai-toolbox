import { ButtonProps } from "antd";
import UnwrapIcon from "@/assets/images/button/unwrap.svg?react";
import WrapIcon from "@/assets/images/button/wrap.svg?react";
import Icon from "@ant-design/icons";
import Toggle from "./Toggle";

const Wrap = ({
  value,
  onChange,
  ...props
}: {
  value?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
} & Omit<ButtonProps, "value" | "onChange">) => {
  return (
    <Toggle
      shape="circle"
      value={value}
      onChange={onChange}
      type="text"
      icon={<Icon component={value ? UnwrapIcon : WrapIcon} />}
      {...props}
    />
  );
};

export default Wrap;
