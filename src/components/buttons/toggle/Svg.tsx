import { ButtonProps } from "antd";
import SvgOutlineIcon from "@/assets/images/button/svg-outline.svg?react";
import SvgFillIcon from "@/assets/images/button/svg-fill.svg?react";
import Icon from "@ant-design/icons";
import Toggle from "./Toggle";

const Svg = ({
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
      type="text"
      onChange={onChange}
      icon={<Icon component={value ? SvgFillIcon : SvgOutlineIcon} />}
      {...props}
    />
  );
};

export default Svg;
