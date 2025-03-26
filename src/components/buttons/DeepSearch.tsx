import DeepSearchFilled from "@/assets/images/button/deepsearch-fill.svg?react";
import DeepSearchOutlined from "@/assets/images/button/deepsearch-outline.svg?react";
import Icon from "@ant-design/icons";
import { Button, ButtonProps } from "antd";

const DeepSearch = ({
  value,
  onChange,
  ...props
}: { value?: boolean; onChange?: (value: boolean) => void } & Omit<
  ButtonProps,
  "onClick" | "onChange"
>) => {
  return (
    <Button
      {...props}
      onClick={() => {
        onChange?.(!value);
      }}
      variant={value ? "filled" : "outlined"}
      color="default"
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
