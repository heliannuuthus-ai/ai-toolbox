import DeepSearchFilled from "@/assets/images/button/deepsearch-fill.svg?react";
import DeepSearchOutlined from "@/assets/images/button/deepsearch-outline.svg?react";
import Icon from "@ant-design/icons";
import { Button, ButtonProps } from "antd";
import { useState } from "react";

const DeepSearch = ({
  value,
  onChange,
  ...props
}: { value?: boolean; onChange?: (value: boolean) => void } & Omit<
  ButtonProps,
  "onClick" | "onChange"
>) => {
  const [deepSearch, setDeepSearch] = useState(value ?? false);
  return (
    <Button
      {...props}
      onClick={() => {
        const tmp = !deepSearch;
        setDeepSearch(tmp);
        onChange?.(tmp);
      }}
      variant={deepSearch ? "filled" : "outlined"}
      color="default"
      icon={
        <Icon
          style={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            borderRadius: "9999px",
          }}
          component={deepSearch ? DeepSearchFilled : DeepSearchOutlined}
        />
      }
    />
  );
};

export default DeepSearch;
