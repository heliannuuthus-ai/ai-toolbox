import { ButtonProps } from "antd";
import ExpandIcon from "@/assets/images/button/expand.svg?react";
import ShrinkIcon from "@/assets/images/button/shrink.svg?react";
import Icon from "@ant-design/icons";
import Toggle from "./Toggle";

const Expand = ({
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
      icon={
        <Icon
          style={{ transform: "matrix(-1, 0, 0, 1, 0, 0) rotate(-45deg)" }}
          component={value ? ShrinkIcon : ExpandIcon}
        />
      }
      {...props}
    />
  );
};

export default Expand;
