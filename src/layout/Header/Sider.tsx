import { ButtonProps, Tooltip } from "antd";
import BreakIcon from "@/assets/images/button/sider-outline.svg?react";
import OpenIcon from "@/assets/images/button/sider-fill.svg?react";
import Icon from "@ant-design/icons";
import Toggle from "../../components/buttons/toggle/Toggle";

const Sider = ({
  value,
  onChange,
  ...props
}: {
  value?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
} & Omit<ButtonProps, "value" | "onChange">) => {
  return (
    <Tooltip title={value ? "收起侧边栏" : "展开侧边栏"}>
      <Toggle
        value={value}
        onChange={onChange}
        shape="circle"
        type="text"
        icon={<Icon component={value ? OpenIcon : BreakIcon} />}
        {...props}
      />
    </Tooltip>
  );
};

export default Sider;
