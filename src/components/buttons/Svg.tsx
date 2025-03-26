import { Button, ButtonProps } from "antd";
import SvgOutlineIcon from "@/assets/images/button/svg-outline.svg?react";
import SvgFillIcon from "@/assets/images/button/svg-fill.svg?react";
import Icon from "@ant-design/icons";

const Svg = ({
  value,
  onChange,
  ...props
}: {
  value?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
} & Omit<ButtonProps, "value" | "onChange">) => {
  const handleClick = async () => {
    onChange?.(!value);
  };

  return (
    <Button
      shape="circle"
      type="text"
      icon={<Icon component={value ? SvgFillIcon : SvgOutlineIcon} />}
      onClick={handleClick}
      {...props}
    />
  );
};

export default Svg;
