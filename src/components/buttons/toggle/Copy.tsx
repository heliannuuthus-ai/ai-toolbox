import { ButtonProps } from "antd";
import Icon from "@ant-design/icons";
import CopyIcon from "@/assets/images/button/copy.svg?react";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import HookIcon from "@/assets/images/button/hook.svg?react";
import { useState } from "react";
import Toggle from "./Toggle";

const Copy = ({ content, ...props }: ButtonProps & { content: string }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (value: boolean) => {
    if (value) return;
    await writeText(content);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Toggle
      {...props}
      shape="circle"
      type="text"
      value={copied}
      onChange={async (value: boolean) => {
        await handleCopy(value);
      }}
      icon={<Icon component={copied ? HookIcon : CopyIcon} />}
    />
  );
};

export default Copy;
