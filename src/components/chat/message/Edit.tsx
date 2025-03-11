import { Button } from "antd";
import { MessageProps, MessageRole } from "./Box";
import Icon from "@ant-design/icons";
import EditIcon from "@/assets/images/button/edit.svg?react";
import { useIconStyles } from "@/components/chat/message/styles";

const Edit = ({ message }: { message: MessageProps }) => {
	const { styles } = useIconStyles();
	return (
		<Button
			className={
				message.role === MessageRole.USER
					? `${styles.userReplyButton}`
					: `${styles.aiReplyButton}`
			}
			shape="circle"
			type="text"
			icon={<Icon component={EditIcon} />}
		/>
	);
};

export default Edit;
