import DeepSearchFilled from "@/assets/images/button/deepsearch-fill.svg?react";
import DeepSearchOutlined from "@/assets/images/button/deepsearch-outline.svg?react";
import Icon from "@ant-design/icons";
import { ButtonProps } from "antd";
import Toggle from "./Toggle";

const DeepSearch = ({
  value,
  onChange,
  ...props
}: { value?: boolean; onChange?: (value: boolean) => void } & Omit<
  ButtonProps,
  "onClick" | "onChange"
>) => {
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
          component={value ? DeepSearchFilled : DeepSearchOutlined}
        />
      }
    />
  );
};

export default DeepSearch;
