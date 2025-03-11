import { Button } from "antd";
import { MessageRole, MessageProps } from "@/components/chat/message/Box";
import Icon from "@ant-design/icons";
import CopyIcon from "@/assets/images/button/copy.svg?react";
import { useIconStyles } from "@/components/chat/message/styles";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import HookIcon from "@/assets/images/button/hook.svg?react";
import { useState } from "react";

const Copy = ({ message }: { message: MessageProps }) => {
	const [copied, setCopied] = useState(false);
	const { styles } = useIconStyles();

	const handleCopy = async () => {
		await writeText(message.content);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 3000);
	};

	return (
		<>
			<Button
				className={
					message.role === MessageRole.USER
						? `${styles.userReplyButton}`
						: `${styles.aiReplyButton}`
				}
				shape="circle"
				type="text"
				icon={<Icon component={copied ? HookIcon : CopyIcon} />}
				onClick={handleCopy}
			/>
		</>
	);
};

export default Copy;
