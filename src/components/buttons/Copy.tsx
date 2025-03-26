import { Button, ButtonProps } from "antd";
import Icon from "@ant-design/icons";
import CopyIcon from "@/assets/images/button/copy.svg?react";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import HookIcon from "@/assets/images/button/hook.svg?react";
import { useState } from "react";

const Copy = ({ content, ...props }: ButtonProps & { content: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copied) return;
    await writeText(content);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      <Button
        shape="circle"
        type="text"
        icon={<Icon component={copied ? HookIcon : CopyIcon} />}
        onClick={handleCopy}
        {...props}
      />
    </>
  );
};

export default Copy;
