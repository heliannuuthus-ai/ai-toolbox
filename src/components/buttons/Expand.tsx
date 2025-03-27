import { Button, ButtonProps } from "antd";
import ExpandIcon from "@/assets/images/button/expand.svg?react";
import ShrinkIcon from "@/assets/images/button/shrink.svg?react";
import Icon from "@ant-design/icons";

const Expand = ({
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
      icon={
        <Icon
          style={{ transform: "matrix(-1, 0, 0, 1, 0, 0) rotate(-45deg)" }}
          component={value ? ShrinkIcon : ExpandIcon}
        />
      }
      onClick={handleClick}
      {...props}
    />
  );
};

export default Expand;
