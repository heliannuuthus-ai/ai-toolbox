import DeepSearchFilled from "@/assets/images/button/deepsearch-fill.svg?react";
import DeepSearchOutlined from "@/assets/images/button/deepsearch-outline.svg?react";
import Icon from "@ant-design/icons";
import { Button } from "antd";

const DeepSearch = ({
  checked,
  onChange,
  onDeepSearchChange,
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onDeepSearchChange: (deepSearch: boolean) => void;
}) => {
  return (
    <Button
      onClick={() => {
        const deepSearch = !checked;
        onChange?.(deepSearch);
        onDeepSearchChange(deepSearch);
      }}
      variant={checked ? "filled" : "outlined"}
      color="default"
      icon={
        <Icon
          style={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            borderRadius: "9999px",
          }}
          component={checked ? DeepSearchFilled : DeepSearchOutlined}
        />
      }
    >
      深度搜索
    </Button>
  );
};

export default DeepSearch;
