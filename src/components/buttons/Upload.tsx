import { Button, ButtonProps } from "antd";
import Icon from "@ant-design/icons";
import LinkOutline from "@/assets/images/button/link-outline.svg?react";
import LinkFill from "@/assets/images/button/link-fill.svg?react";
import { useEffect, useState } from "react";

const Upload = ({
  value,
  onChange,
  ...props
}: {
  value?: boolean;
  onChange?: (value: boolean) => Promise<void>;
} & ButtonProps) => {
  const [uploading, setUploading] = useState(value ?? false);

  useEffect(() => {}, [value]);

  return (
    <Button
      onClick={async () => {
        const tmp = !uploading;
        setUploading(tmp);
        await onChange?.(tmp);
      }}
      style={{
        minWidth: "36px",
        minHeight: "36px",
        fontSize: "14px",
        borderRadius: "9999px",
      }}
      icon={
        <Icon
          style={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          component={uploading ? LinkFill : LinkOutline}
        />
      }
      {...props}
    />
  );
};

export default Upload;
