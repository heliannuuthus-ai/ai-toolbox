import { Button, ButtonProps } from "antd";
import UnwrapIcon from "@/assets/images/button/unwrap.svg?react";
import WrapIcon from "@/assets/images/button/wrap.svg?react";
import Icon from "@ant-design/icons";

const Wrap = ({
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
      icon={<Icon component={value ? UnwrapIcon : WrapIcon} />}
      onClick={handleClick}
      {...props}
    />
  );
};

export default Wrap;
